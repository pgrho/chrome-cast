using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shipwreck.GoogleCastApi.Scraper
{
    internal static class HtmlNodeCollectionHelper
    {
        public static string SanitizeDocumentation(this HtmlNodeCollection nodes)
        {
            if (nodes?.Count > 0)
            {
                StringBuilder sb = null;

                foreach (var n in nodes)
                {
                    var t = n.InnerText;
                    if (t == null)
                    {
                        continue;
                    }
                    foreach (var c in HtmlEntity.DeEntitize(t))
                    {
                        if (char.IsWhiteSpace(c))
                        {
                            if (sb?.Length > 0 && sb[sb.Length - 1] != ' ')
                            {
                                sb.Append(' ');
                            }
                        }
                        else
                        {
                            (sb ?? (sb = new StringBuilder())).Append(c);
                        }
                    }
                }

                if (sb != null && sb[sb.Length - 1] == ' ')
                {
                    sb.Length--;
                }

                return sb?.ToString();
            }
            return null;
        }
    }
}
