#!/bin/bash

# 构建 Next.js
cd web-content
npm run build

# 构建 Flutter
cd ..
flutter build ios  # 或其他平台 