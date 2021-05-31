# test linting (test syntax, format code with prettier)
yarn lint && echo "Linitng passed!" || "Linting error, check syntax!" && exit 1
yarn test:unit && echo "unit test passed!" || "Linting error, check syntax!" && exit 1
