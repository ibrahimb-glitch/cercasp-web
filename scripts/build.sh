#!/bin/bash

# Build script for CERCASP monorepo

echo "Building all packages..."

yarn workspaces foreach -pt run build

echo "Build complete."