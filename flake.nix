{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, ... } @ inputs:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      packages.${system} = {
        devenv-up = self.devShells.${system}.default.config.procfileScript;
        packages."${system}".devenv-test = self.devShells.${system}.default.config.test;
      };

      devShells.${system}.default = devenv.lib.mkShell {
        inherit inputs pkgs;
        modules = [
          ({ pkgs, config, ... }: {

            /* Fix Prisma engines execute files not found */
            env = {
              PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine";
              PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine";
              PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node";
              PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt";
            };

            packages = [
              pkgs.nodejs_22

              pkgs.nodePackages_latest.prisma
              pkgs.prisma-engines
            ];

            languages = {
              typescript.enable = true;
              javascript = {
                enable = true;
                package = pkgs.nodejs_22;
                npm.enable = true;

              };
            };

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
              nuxt.exec = ''
              ${pkgs.nodejs_22}/bin/npm install &&\
              ${pkgs.nodePackages_latest.prisma}/bin/prisma generate --schema src/prisma/schema.prisma --generator ${pkgs.prisma-engines}/bin/schema-engine &&\
              ${pkgs.nodejs_22}/bin/npm run dev'';
            };

            pre-commit.hooks.prettier.settings.with-node-modules = true;
          })
        ];
      };
    };
}