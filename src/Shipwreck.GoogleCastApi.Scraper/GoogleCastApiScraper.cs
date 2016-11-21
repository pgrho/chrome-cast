using HtmlAgilityPack;
using Shipwreck.TypeScriptModels;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Shipwreck.GoogleCastApi.Scraper
{
    public class GoogleCastApiScraper
    {
        private enum H2
        {
            None,
            Class,
            Enum,
            Property,
            Method,
            Namespace,
            Constructor,
            AbstractType,
        }

        public event EventHandler<TypeResolveEventArgs> TypeResolved;

        public event EventHandler<ScraperDonwloadEventArgs> Downloading;

        public event EventHandler<ScraperDonwloadEventArgs> Downloaded;



        public event EventHandler<ModuleEventArgs> ModuleParsing;

        public event EventHandler<ModuleEventArgs> ModuleParsed;

        public event EventHandler<TypeEventArgs> TypeParsing;

        public event EventHandler<TypeEventArgs> TypeParsed;

        public event EventHandler<MemberEventArgs> MemberParsed;

        public event EventHandler<StatementEventArgs> StatementParsed;



        private async Task<string> DownloadContentAsync(HttpClient client, string url)
        {
            var e = new ScraperDonwloadEventArgs(client, url);
            Downloading?.Invoke(this, e);

            if (e.Html != null || e.StatusCode != default(HttpStatusCode))
            {
                return e.Html;
            }

            var res = await client.GetAsync(url);
            e.StatusCode = res.StatusCode;

            if (res.IsSuccessStatusCode)
            {
                e.Html = await res.Content.ReadAsStringAsync();
            }
            Downloaded?.Invoke(this, e);

            return e.Html;
        }

        private FlagedType ResolveType(TypeScriptContext context, string name)
        {
            var e = new TypeResolveEventArgs(name);
            e.Type = context.ResolveType(name, n => ResolveType(context, n));
            TypeResolved?.Invoke(this, e);

            if (e.Type.Type == null)
            {
                throw new ArgumentException(string.Format("'{0}'が解決できませんでした。", name));
            }

            return e.Type;
        }
        public async Task<TypeScriptContext> LoadAsync(string rootUrl)
        {
            using (var hc = new HttpClient())
            {
                var urls = await GetUrlListAsync(hc, rootUrl);

                var tsc = new TypeScriptContext();
                foreach (var url in urls)
                {
                    var html = await DownloadContentAsync(hc, url);

                    if (html == null)
                    {
                        continue;
                    }

                    var hd = new HtmlDocument();
                    hd.LoadHtml(html);

                    var m = hd.DocumentNode.SelectSingleNode("//*[@id='jsdoc-main']");

                    var fullName = m.SelectSingleNode("header/h1").InnerText.Trim();

                    var kind = m.SelectSingleNode("header//*[@class='label label-kind']").InnerText?.Trim();

                    var desc = m.SelectSingleNode("header//p")?.InnerText;

                    Console.WriteLine($"    {fullName} {kind} {desc}");

                    if (desc == null)
                    {
                        Console.Write("");
                    }

                    var section = m.SelectSingleNode("section");

                    switch (kind.ToLowerInvariant())
                    {
                        case "namespace":
                            ParseNamespaceHtml(tsc, fullName, desc, section);
                            break;

                        case "class":
                            ParseClassHtml(tsc, fullName, desc, section);
                            break;
                    }
                }

                return tsc;
            }
        }

        private async Task<string[]> GetUrlListAsync(HttpClient client, string url)
        {
            var html = await DownloadContentAsync(client, url);

            var hd = new HtmlDocument();
            hd.LoadHtml(html);

            var pages = hd.DocumentNode
                                .SelectNodes("//a[@class='!symbol-index-name']")
                                .Select(_ => _.GetAttributeValue("href", "").Split('#').FirstOrDefault())
                                .Where(_ => !string.IsNullOrEmpty(_))
                                .GroupBy(_ => _)
                                .Select(_ => _.Key)
                                .ToArray();

            return pages;
        }

        private void ParseNamespaceHtml(TypeScriptContext tsc, string fullName, string desc, HtmlNode section)
        {
            var md = new ModuleDeclaration()
            {
                Name = fullName
            };

            if (desc != null)
            {
                md.Documentation = new Documentation()
                {
                    Summary = desc
                };
            }
            tsc.Statements.Add(md);

            var e = new ModuleEventArgs(md);
            ModuleParsing?.Invoke(this, e);

            var headers = section.SelectNodes("//h2|//h3[@class='symbol-name']");

            if (headers != null)
            {
                var t = H2.None;
                foreach (var h in headers)
                {
                    if (h.Name.Equals("h2", StringComparison.InvariantCultureIgnoreCase))
                    {
                        switch (h.InnerText.Trim().ToLowerInvariant())
                        {
                            case "classes":
                            case "class":
                                t = H2.Class;
                                break;

                            case "enumerations":
                            case "enumeration":
                                t = H2.Enum;
                                break;

                            case "properties":
                            case "property":
                                t = H2.Property;
                                break;

                            case "methods":
                            case "method":
                                t = H2.Method;
                                break;

                            case "namespaces":
                            case "namespace":
                                t = H2.Namespace;
                                break;

                            case "abstract types":
                            case "abstract type":
                                t = H2.AbstractType;
                                break;

                            default:
                                t = H2.None;
                                Debugger.Break();
                                break;
                        }
                    }
                    else
                    {
                        var sn = h.InnerText.Trim();
                        switch (t)
                        {
                            case H2.Class:
                            case H2.AbstractType:

                                if (tsc.FindType(sn) == null)
                                {
                                    var cl = new ClassDeclaration()
                                    {
                                        Name = sn.Split('.').Last(),
                                        IsExport = true,
                                        IsAbstract = t == H2.AbstractType
                                    };
                                    if (desc != null)
                                    {
                                        cl.Documentation = new Documentation()
                                        {
                                            Summary = desc
                                        };
                                    }
                                    md.Statements.Add(cl);
                                }

                                break;

                            case H2.Enum:
                                ProcessEnum(tsc, md, h, sn);
                                break;

                            case H2.Property:
                                ProcessModuleProperty(tsc, md, h, sn);
                                break;

                            case H2.Method:
                                ProcessModuleMethod(tsc, md, h, sn);
                                break;

                            default:
                                Debugger.Break();
                                break;
                        }
                    }
                }
            }
            ModuleParsed?.Invoke(this, e);
        }

        private void ParseClassHtml(TypeScriptContext tsc, string fullName, string desc, HtmlNode section)
        {
            var cl = tsc.FindType(fullName) as ClassDeclaration;
            if (cl == null)
            {
                var i = fullName.LastIndexOf('.');
                var md = tsc.GetModule(fullName.Substring(0, i));

                cl = new ClassDeclaration()
                {
                    Name = fullName.Substring(i + 1),
                    IsExport = true
                };

                md.Statements.Add(cl);
            }

            if (cl.Documentation == null && desc != null)
            {
                cl.Documentation = new Documentation()
                {
                    Summary = desc
                };
            }

            var e = new TypeEventArgs(cl);
            TypeParsing?.Invoke(this, e);

            var headers = section.SelectNodes("//h2|//h3[@class='symbol-name']");

            if (headers != null)
            {
                var t = H2.None;
                foreach (var h in headers)
                {
                    if (h.Name.Equals("h2", StringComparison.InvariantCultureIgnoreCase))
                    {
                        switch (h.InnerText.Trim().ToLowerInvariant())
                        {
                            case "constructor":
                                t = H2.Constructor;
                                break;

                            case "enumerations":
                            case "enumeration":
                                t = H2.Enum;
                                break;

                            case "properties":
                            case "property":
                                t = H2.Property;
                                break;

                            case "methods":
                            case "method":
                                t = H2.Method;
                                break;

                            case "namespaces":
                            case "namespace":
                                t = H2.Namespace;
                                break;

                            default:
                                t = H2.None;
                                Debugger.Break();
                                break;
                        }
                    }
                    else
                    {
                        var sn = h.InnerText.Trim();
                        switch (t)
                        {
                            case H2.Constructor:
                                ProcessConstructor(tsc, cl, h, sn);
                                break;

                            case H2.Property:
                                ProcessProperty(tsc, cl, h, sn);
                                break;

                            case H2.Method:
                                ProcessMethod(tsc, cl, h, sn);
                                break;

                            default:
                                Debugger.Break();
                                break;
                        }
                    }
                }
            }
            TypeParsed?.Invoke(this, e);
        }

        private void ProcessConstructor(TypeScriptContext tsc, ClassDeclaration md, HtmlNode h, string sn)
        {
            var div = h.ParentNode;
            var fd = new ConstructorDeclaration();

            ProcessFunctionCore(tsc, sn, div, fd);
            md.Members.Add(fd);

            MemberParsed?.Invoke(this, new MemberEventArgs(fd));
        }

        private void ProcessProperty(TypeScriptContext tsc, ClassDeclaration md, HtmlNode h, string sn)
        {
            var div = h.ParentNode;
            var vd = new PropertyDeclaration()
            {
                // IsConstant = div.SelectSingleNode("div/span[@class='label label-constant']") != null,
                Name = sn
            };

            var pt = ResolveType(tsc, div.SelectSingleNode("*[@class='type-signature']")?.InnerText.Trim());

            vd.IsRequired = pt.IsRequired;
            vd.PropertyType = pt.Type;

            if (vd.PropertyType == null)
            {
                Debugger.Break();
            }

            var dsc = div.SelectSingleNode("p[not(@class)]")?.InnerText.Trim();
            if (dsc != null)
            {
                vd.Documentation = new Documentation()
                {
                    Summary = dsc
                };
            }
            md.Members.Add(vd);

            MemberParsed?.Invoke(this, new MemberEventArgs(vd));
        }

        private void ProcessMethod(TypeScriptContext tsc, ClassDeclaration md, HtmlNode h, string sn)
        {
            var div = h.ParentNode;
            var fd = new MethodDeclaration();

            ProcessFunctionCore(tsc, sn, div, fd);
            md.Members.Add(fd);

            MemberParsed?.Invoke(this, new MemberEventArgs(fd));
        }

        private void ProcessEnum(TypeScriptContext tsc, ModuleDeclaration module, HtmlNode h3, string name)
        {
            var div = h3.ParentNode;
            var enumType = div.SelectSingleNode("*[@class='type-signature']")?.InnerText.Trim();
            var desc = div.SelectSingleNode("p[not(@class)]")?.InnerText.Trim();

            TypeDeclaration td;
            ITypeScriptType ft;
            IList fs;
            if (enumType == null || enumType.Equals("number"))
            {
                var ed = new EnumDeclaration();
                td = ed;
                ft = ed;
                fs = ed.Members;
            }
            else
            {
                var ct = new ClassDeclaration();
                td = ct;
                ft = ResolveType(tsc, enumType).Type;
                fs = ct.Members;
            }
            td.IsExport = true;
            td.Name = name;
            if (desc != null)
            {
                td.Documentation = new Documentation()
                {
                    Summary = desc
                };
            }
            module.Statements.Add(td);

            var e = new TypeEventArgs(td);
            TypeParsing?.Invoke(this, e);

            var trs = div.SelectNodes("section//table/tbody/tr");

            if (trs != null)
            {
                foreach (var tr in trs)
                {
                    var mn = tr.SelectSingleNode("td[1]")?.InnerText?.Trim();

                    if (mn != null)
                    {
                        var md = tr.SelectSingleNode("td[2]")?.InnerText?.Trim();

                        Console.WriteLine("        {0}: {1}", mn, md);

                        var f = new FieldDeclaration();
                        f.AccessModifier = AccessModifier.Public;
                        f.IsStatic = true;
                        f.Name = mn;
                        f.FieldType = ft;

                        if (md != null)
                        {
                            f.Documentation = new Documentation()
                            {
                                Summary = md
                            };
                        }

                        fs.Add(f);
                    }
                }
            }
            TypeParsed?.Invoke(this, e);
        }

        private void ProcessModuleProperty(TypeScriptContext tsc, ModuleDeclaration md, HtmlNode h, string sn)
        {
            var div = h.ParentNode;

            var typeText = div.SelectSingleNode("*[@class='type-signature']")?.InnerText.Trim();

            var vd = new VariableDeclaration()
            {
                IsConstant = div.SelectSingleNode("div/span[@class='label label-constant']") != null,
                Name = sn,
                VariableType = string.IsNullOrEmpty(typeText) ? BuiltinType.Any : ResolveType(tsc, typeText).Type
            };
            var dsc = div.SelectSingleNode("p[not(@class)]")?.InnerText.Trim();
            if (dsc != null)
            {
                vd.Documentation = new Documentation()
                {
                    Summary = dsc
                };
            }
            md.Statements.Add(vd);

            StatementParsed?.Invoke(this, new StatementEventArgs(vd));
        }

        private void ProcessModuleMethod(TypeScriptContext tsc, ModuleDeclaration md, HtmlNode h, string sn)
        {
            var div = h.ParentNode;
            var fd = new FunctionDeclaration();

            ProcessFunctionCore(tsc, sn, div, fd);
            md.Statements.Add(fd);

            StatementParsed?.Invoke(this, new StatementEventArgs(fd));
        }

        private void ProcessFunctionCore(TypeScriptContext tsc, string name, HtmlNode div, ITypeScriptFunction fd)
        {
            fd.Name = name;
            fd.Documentation = new Documentation();
            fd.Documentation.Summary = div.SelectSingleNode("p[not(@class)]")?.InnerText.Trim();

            var returnValue = div.SelectSingleNode("dl/dd/p");
            if (returnValue != null)
            {
                fd.ReturnType = ResolveType(tsc, returnValue.SelectSingleNode("code").InnerText).Type;
                fd.Documentation.Returns = returnValue.SelectSingleNode("text()")?.InnerText;
            }

            var trs = div.SelectNodes("section//table/tbody/tr");

            if (trs != null)
            {
                foreach (var tr in trs)
                {
                    var mn = tr.SelectSingleNode("td[1]")?.InnerText?.Trim();

                    if (mn != null)
                    {
                        var pt = ResolveType(tsc, tr.SelectSingleNode("td[2]/p[@class='details-table-types']")?.InnerText?.Trim());
                        fd.Parameters.Add(new ParameterDeclaration()
                        {
                            Name = mn,
                            ParameterType = pt.Type,
                            IsRequired = !pt.IsNullable
                        });
                        fd.Documentation.Parameters.Add(new ParameterDocumentation()
                        {
                            ParameterName = mn,
                            Description = tr.SelectNodes("td[2]/p[not(@class)]")?.Aggregate((StringBuilder)null, (sb, p) => sb == null ? new StringBuilder(p.InnerText) : sb.Append(' ').Append(p.InnerText))?.ToString()
                        });
                        if (fd.Parameters.Last() == null)
                        {
                            Debugger.Break();
                        }
                    }
                }
            }
        }
    }


}