using Shipwreck.TypeScriptModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Shipwreck.GoogleCastApi.Scraper
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var sc = new GoogleCastApiScraper();
            sc.Downloading += (s, e) =>
            {
                if (e.Url.EndsWith(".html", StringComparison.InvariantCultureIgnoreCase) || e.Url.EndsWith(".htm", StringComparison.InvariantCultureIgnoreCase))
                {
                    var fn = Path.GetFileName(e.Url);
                    if (File.Exists(fn))
                    {
                        e.Html = File.ReadAllText(fn);

                        int cd;
                        if (int.TryParse(e.Html, out cd))
                        {
                            e.StatusCode = (HttpStatusCode)cd;
                            e.Html = null;
                        }
                        else
                        {
                            e.StatusCode = HttpStatusCode.OK;
                        }
                        Console.WriteLine("Cached Download: {0:D} {1}", e.StatusCode, e.Url);
                        return;
                    }
                }

                Console.WriteLine("Downloading: {0}", e.Url);
            };
            sc.Downloaded += (s, e) =>
            {
                Console.WriteLine("Downloaded: {0:D} {1}", e.StatusCode, e.Url);

                var fn = Path.GetFileName(e.Url);
                var ext = Path.GetExtension(fn);
                if (e.Url.EndsWith(".html", StringComparison.InvariantCultureIgnoreCase) || e.Url.EndsWith(".htm", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (e.Html == null)
                    {
                        File.WriteAllText(fn, e.StatusCode.ToString("D"));
                    }
                    else
                    {
                        File.WriteAllText(fn, e.Html);
                    }
                }
            };

            var ud = new Dictionary<string, UnknownType>();
            sc.TypeResolved += (s, e) =>
            {
                if (e.Type.Type == null)
                {
                    UnknownType ut;
                    if (!ud.TryGetValue(e.TypeName, out ut))
                    {
                        ut = new UnknownType(e.TypeName);
                        ud[e.TypeName] = ut;

                        var c = Console.ForegroundColor;
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("Unknown Type: {0}", e.TypeName);
                        Console.ForegroundColor = c;
                    }
                    e.Type = new FlagedType(ut);
                }
            };

            sc.ModuleParsing += (s, e) => Console.WriteLine("module {0} {{", e.Module.Name);
            sc.ModuleParsed += (s, e) => Console.WriteLine("}");
            sc.TypeParsing += (s, e) => Console.WriteLine("    type {0} {{", e.Type.Name);
            sc.TypeParsed += (s, e) => Console.WriteLine("    }");
            sc.MemberParsed += (s, e) => Console.WriteLine("        {0}", e.Member.Name);
            sc.StatementParsed += (s, e) => Console.WriteLine("    {0}", e.Statement);

            var r = sc.LoadAsync("https://developers.google.com/cast/docs/reference/chrome/").Result;

            Console.WriteLine("Unresolved Types:");
            foreach (var n in ud.Keys)
            {
                Console.WriteLine("    {0}: {1}", n, r.FindType(n) == null ? "NG" : "OK");
            }

            using (var sw = new StringWriter())
            {
                r.WriteAsDeclaration(sw);
                sw.Flush();

                var code = sw.ToString();

                File.WriteAllText("../../chrome-cast.d.ts", code);
                Console.WriteLine(code);
            }


            Console.WriteLine("Hit any key to exit...");
            Console.ReadKey();
        }
    }
}
