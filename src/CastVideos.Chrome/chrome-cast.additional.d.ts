declare namespace cast.framework {

    interface CastOptions {
        // /**
        //  * 
        //  * @param opt_options Optional options to copy from. Only defined value are used, otherwise the default value is used.Value must not be null.
        //  */
        // new (opt_options: CastOptions): CastOptions;
    }

    interface CastContext {
        getInstance(): CastContext;
    }
}