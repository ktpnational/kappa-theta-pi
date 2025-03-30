type BetterAuthOptions = {
    appName?: string;
    baseURL?: string;
    basePath?: string;
    secret?: string;
    database?: PostgresPool | MysqlPool | Database | Dialect | AdapterInstance | {
        dialect: Dialect;
        type: KyselyDatabaseType;
        casing?: "snake" | "camel";
    } | {
        db: Kysely<any>;
        type: KyselyDatabaseType;
        casing?: "snake" | "camel";
    };
    secondaryStorage?: SecondaryStorage;
    emailVerification?: {
        sendVerificationEmail?: (
        data: {
            user: User;
            url: string;
            token: string;
        },
        request?: Request) => Promise<void>;
        sendOnSignUp?: boolean;
        autoSignInAfterVerification?: boolean;
        expiresIn?: number;
        onEmailVerification?: (user: User, request?: Request) => Promise<void>;
    };
    emailAndPassword?: {
        enabled: boolean;
        disableSignUp?: boolean;
        requireEmailVerification?: boolean;
        maxPasswordLength?: number;
        minPasswordLength?: number;
        sendResetPassword?: (
        data: {
            user: User;
            url: string;
            token: string;
        },
        request?: Request) => Promise<void>;
        resetPasswordTokenExpiresIn?: number;
        password?: {
            hash?: (password: string) => Promise<string>;
            verify?: (data: {
                hash: string;
                password: string;
            }) => Promise<boolean>;
        };
        autoSignIn?: boolean;
    };
    socialProviders?: SocialProviders;
    plugins?: BetterAuthPlugin[];
    user?: {
        modelName?: string;
        fields?: Partial<Record<keyof OmitId<User>, string>>;
        additionalFields?: {
            [key: string]: FieldAttribute;
        };
        changeEmail?: {
            enabled: boolean;
            sendChangeEmailVerification?: (data: {
                user: User;
                newEmail: string;
                url: string;
                token: string;
            }, request?: Request) => Promise<void>;
        };
        deleteUser?: {
            enabled?: boolean;
            sendDeleteAccountVerification?: (data: {
                user: User;
                url: string;
                token: string;
            }, request?: Request) => Promise<void>;
            beforeDelete?: (user: User, request?: Request) => Promise<void>;
            afterDelete?: (user: User, request?: Request) => Promise<void>;
        };
    };
    session?: {
        modelName?: string;
        fields?: Partial<Record<keyof OmitId<Session>, string>>;
        expiresIn?: number;
        updateAge?: number;
        additionalFields?: {
            [key: string]: FieldAttribute;
        };
        storeSessionInDatabase?: boolean;
        preserveSessionInDatabase?: boolean;
        cookieCache?: {
            maxAge?: number;
            enabled?: boolean;
        };
        freshAge?: number;
    };
    account?: {
        modelName?: string;
        fields?: Partial<Record<keyof OmitId<Account>, string>>;
        accountLinking?: {
            enabled?: boolean;
            trustedProviders?: Array<LiteralUnion<SocialProviderList[number] | "email-password", string>>;
            allowDifferentEmails?: boolean;
            allowUnlinkingAll?: boolean;
        };
    };
    verification?: {
        modelName?: string;
        fields?: Partial<Record<keyof OmitId<Verification>, string>>;
        disableCleanup?: boolean;
    };
    trustedOrigins?: string[] | ((request: Request) => string[] | Promise<string[]>);
    rateLimit?: {
        enabled?: boolean;
        window?: number;
        max?: number;
        customRules?: {
            [key: string]: {
                window: number;
                max: number;
            } | ((request: Request) => {
                window: number;
                max: number;
            } | Promise<{
                window: number;
                max: number;
            }>);
        };
        storage?: "memory" | "database" | "secondary-storage";
        modelName?: string;
        fields?: Record<keyof RateLimit, string>;
        customStorage?: {
            get: (key: string) => Promise<RateLimit | undefined>;
            set: (key: string, value: RateLimit) => Promise<void>;
        };
    };
    advanced?: {
        ipAddress?: {
            ipAddressHeaders?: string[];
            disableIpTracking?: boolean;
        };
        useSecureCookies?: boolean;
        disableCSRFCheck?: boolean;
        crossSubDomainCookies?: {
            enabled: boolean;
            additionalCookies?: string[];
            domain?: string;
        };
        cookies?: {
            [key: string]: {
                name?: string;
                attributes?: CookieOptions;
            };
        };
        defaultCookieAttributes?: CookieOptions;
        cookiePrefix?: string;
        generateId?: ((options: {
            model: LiteralUnion<Models, string>;
            size?: number;
        }) => string) | false;
    };
    logger?: Logger;
    databaseHooks?: {
        user?: {
            create?: {
                before?: (user: User, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<User> & Record<string, any>;
                }>;
                after?: (user: User, context?: GenericEndpointContext) => Promise<void>;
            };
            update?: {
                before?: (user: Partial<User>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<User & Record<string, any>>;
                }>;
                after?: (user: User, context?: GenericEndpointContext) => Promise<void>;
            };
        };
        session?: {
            create?: {
                before?: (session: Session, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Session> & Record<string, any>;
                }>;
                after?: (session: Session, context?: GenericEndpointContext) => Promise<void>;
            };
            update?: {
                before?: (session: Partial<Session>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Session & Record<string, any>;
                }>;
                after?: (session: Session, context?: GenericEndpointContext) => Promise<void>;
            };
        };
        account?: {
            create?: {
                before?: (account: Account, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Account> & Record<string, any>;
                }>;
                after?: (account: Account, context?: GenericEndpointContext) => Promise<void>;
            };
            update?: {
                before?: (account: Partial<Account>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Account & Record<string, any>>;
                }>;
                after?: (account: Account, context?: GenericEndpointContext) => Promise<void>;
            };
        };
        verification?: {
            create?: {
                before?: (verification: Verification, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Verification> & Record<string, any>;
                }>;
                after?: (verification: Verification, context?: GenericEndpointContext) => Promise<void>;
            };
            update?: {
                before?: (verification: Partial<Verification>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Verification & Record<string, any>>;
                }>;
                after?: (verification: Verification, context?: GenericEndpointContext) => Promise<void>;
            };
        };
    };
    onAPIError?: {
        throw?: boolean;
        onError?: (error: unknown, ctx: AuthContext) => void | Promise<void>;
        errorURL?: string;
    };
    hooks?: {
        before?: AuthMiddleware;
        after?: AuthMiddleware;
    };
    disabledPaths?: string[];
};