#!/bin/bash

# Install extensions for VSCode
echo "Installing VSCode extensions for linting and formatting..."

code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode

echo "VSCode extensions installed successfully."
