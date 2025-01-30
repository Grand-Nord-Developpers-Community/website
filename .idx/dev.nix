{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
 "akamud.vscode-theme-onedark"
 "bradlc.vscode-tailwindcss"
 "dsznajder.es7-react-js-snippets"
 "esbenp.prettier-vscode"
 "formulahendry.auto-rename-tag"
 "mhutchie.git-graph"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}