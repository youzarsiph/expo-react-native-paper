@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../sabre/dav/bin/naturalselection
SET COMPOSER_RUNTIME_BIN_DIR=%~dp0
python "%BIN_TARGET%" %*
