#!/bin/bash
node services/proxy/index.js &
node services/products/index.js &
node services/auth/index.js &