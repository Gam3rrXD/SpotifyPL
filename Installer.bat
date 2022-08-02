@echo off
cd %cd%
title SpotifyPL - Installer - github.com/Gam3rrXD
set /p ins=Install BetterDiscord (y/n)? 
set /p ad=Install Ad-Removal? (y/n)? 
if %ins%==y start "BetterDiscordInstall" BetterDiscord-Windows.exe
if %ins%==n echo Proceding to next step.
echo Downloading Script.
powershell -executionpolicy remotesigned -Command "wget "https://raw.githubusercontent.com/Gam3rrXD/SpotifyPL/main/SpotifyPL.plugin.js" -outfile "%cd%\SpotifyPL.plugin.js""
echo Script Downloaded!
copy SpotifyPL.plugin.js %AppData%\BetterDiscord\plugins\SpotifyPL.plugin.js /y
echo Script Copied!
if %ad%==y powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12}"; "& {(Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/amd64fox/SpotX/main/Install.ps1').Content | Invoke-Expression}"
if %ad%==n echo Exiting | exit
pause
exit /b