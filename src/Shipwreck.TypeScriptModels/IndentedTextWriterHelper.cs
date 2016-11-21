using System;
using System.CodeDom.Compiler;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Shipwreck.TypeScriptModels
{
    internal static class IndentedTextWriterHelper
    {
        public static void WriteParameterDeclaration(this IndentedTextWriter writer, ITypeScriptFunction function, bool returnTypeFatArrow)
        {
            writer.Write("(");
            if (function.Parameters?.Count > 0)
            {
                for (var i = 0; i < function.Parameters.Count; i++)
                {
                    if (i > 0)
                    {
                        writer.Write(", ");
                    }
                    var p = function.Parameters[i];
                    writer.Write(p.Name);
                    if (p.IsOptional)
                    {
                        writer.Write('?');
                    }
                    writer.Write(": ");
                    if (p.ParameterType == null)
                    {
                        writer.Write("any");
                    }
                    else
                    {
                        p.ParameterType.WriteTypeName(writer);
                    }
                }
            }
            writer.Write(")");
            if (returnTypeFatArrow)
            {
                writer.Write("=> ");
            }
            else
            {
                writer.Write(": ");
            }
            if (function.ReturnType != null)
            {
                writer.Write(function.ReturnType.Name);
            }
            else
            {
                writer.Write("void");
            }
            writer.WriteLine(";");
        }
    }
}