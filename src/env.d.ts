declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    ORIGINS: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
  }
}
