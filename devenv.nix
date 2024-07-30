{ pkgs, ... }:

{
    /* TODO: Fix nix error: cant mkdir, prisma/engines not found */
    env = {
      PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine";
      PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine";
      PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node";
      PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt";
      PATH="$PWD/node_modules/.bin/:$PATH";
    };

    packages = with pkgs; [
        nodejs_18
        nodePackages_latest.prisma
        prisma-engines

        openssl

        postman
    ];

    languages.javascript.enable = true;

    services.postgres = {
    enable = true;
    package = pkgs.postgresql_16;
    initialDatabases = [{ name = "collectionServer"; }];
    listen_addresses = "*";

    initialScript = ''
        CREATE ROLE postgres SUPERUSER;
        ALTER ROLE postgres WITH PASSWORD 'postgres';
        ALTER ROLE postgres WITH LOGIN;
    '';

    };

    processes = {
        nuxt.exec = "npm install && npm run dev";

        /* TODO: find alternative to postman, web-based probably */
        postman.exec = "postman";
    };

}
