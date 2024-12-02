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

            packages = with pkgs; [
              nodePackages_latest.prisma
              prisma-engines
              
              openssl # needed by prisma
           ];

            languages = {
              typescript.enable = true;
              javascript = {
                enable = true;
                package = pkgs.nodejs_22;
                
                npm = {
                  enable = true;
                  install.enable = true;
                };

              };
            };

            tasks = {
              "prisma:generate-schema" = {
                exec = "${pkgs.nodePackages_latest.prisma}/bin/prisma generate --schema src/prisma/schema.prisma";
                before = [ "devenv:enterShell" "devenv:enterTest" ];
              };
            };

            services.postgres = {
              enable = true;
              package = pkgs.postgresql_16;
              initialDatabases = [
                {
                  name = "collectionServer";
                  user = "postgresql";
                  pass = "postgresql";
                }
              ];
              listen_addresses = "*";

              initialScript = ''
                ALTER USER postgresql CREATEDB;
              '';
            };



            processes = {
              nuxt.exec = ''
              ${pkgs.nodejs_22}/bin/npm run dev'';
            };

            pre-commit.hooks.prettier.settings.with-node-modules = true;
          })
        ];
      };
    };
}
