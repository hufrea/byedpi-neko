set -e

mkdir_libs() {
  rm -rf "$1"
  mkdir "$1"
  cd "$1"
  mkdir arm64-v8a armeabi-v7a x86 x86_64
}

unzip_ciadpi() {
  rm -rf tmp
  mkdir -p tmp
  tar -xzf tmp.tar.gz -C tmp

  mv tmp/ciadpi-"$2" "$1"/libciadpi.so
  rm -rf tmp*
}

download_ciadpi() {
  VERSION="11"
  TAG="v0.${VERSION}"
  mkdir_libs "app_ciadpi/libs"

  curl -Lo tmp.tar.gz "https://github.com/hufrea/byedpi/releases/download/${TAG}/byedpi-${VERSION}-aarch64.tar.gz"
  unzip_ciadpi arm64-v8a aarch64
  curl -Lo tmp.tar.gz "https://github.com/hufrea/byedpi/releases/download/${TAG}/byedpi-${VERSION}-armv7l.tar.gz"
  unzip_ciadpi armeabi-v7a armv7l
}

download_"$1"
