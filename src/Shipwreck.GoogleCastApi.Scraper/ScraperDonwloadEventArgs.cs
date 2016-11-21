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
    public sealed class ScraperDonwloadEventArgs : EventArgs
    {
        internal ScraperDonwloadEventArgs(HttpClient client, string url)
        {
            HttpClient = client;
            Url = url;
        }

        public HttpClient HttpClient { get; }
        public string Url { get; set; }

        public HttpStatusCode StatusCode { get; set; }

        public string Html { get; set; }
    }
}