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
    public sealed class TypeEventArgs : EventArgs
    {
        public TypeEventArgs(TypeDeclaration type)
        {
            Type = type;
        }

        public TypeDeclaration Type { get; }
    }
}