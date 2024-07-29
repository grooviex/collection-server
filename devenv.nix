{ pkgs, ... }:

{
    env = {
      PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
      PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
      PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
    };

    packages = with pkgs; [ nodejs_18 nodePackages_latest.prisma openssl ];
    languages.javascript.enable = true;

    services.mysql.enable = true;
    services.mysql.package = true;

}
