# Matsuri Plugins

## To find plugin download

https://matsuridayo.github.io/m-plugin/

https://github.com/MatsuriDayo/plugins/releases

## To build a plugin (Сборка плагина)
### Необходимо: 
* Android Studio 
* npm (nodejs для Windows)
* curl (для Linux)

1. Перейдите в папку js, установите модули:

```
   cd js
   npm install
   cd ..
```
   
2. Скачайте byedpi:
  * Для Linux:
   
```
    ./download.sh ciadpi
```

  Также можно собрать byedpi вручную, в папке app_ciadpi/libs/ подменить libciadpi.so с нужной архитектурой на свой билд 
  
  * Для Windows нужно вручную
      - перейти в папку app_ciadpi
      - создать папку libs
      - в папке libs создать папки с нужными архитектурами: arm64-v8a, armeabi-v7a, x86, x86_64
      - скачать нужный билд byedpi https://github.com/hufrea/byedpi/releases
      - поместить билд в папку с соответствующей архитектурой, переименовать в libciadpi.so

3. Откройте проект в Android Studio, подождите инициализацию Gradle

4. Menu -> Build -> Generate signed app bundle/APK... -> APK

5. В Key store path -> Create new, укажите любое название, любой пароль от  6 символов и Имя
![Screenshot from 2024-10-10 17-00-04](https://github.com/user-attachments/assets/263d14d7-9ae1-4f4d-be59-d3bb2d09bef3)


6. Выберите Release
7. Create

APK появятся в app_ciadpi/release/

Т.к. подпись отличается, нужно будет удалить предыдущую версию плагина.
