$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:8081/')
$listener.Start()
Write-Host 'Server running on http://localhost:8081/'

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    $filePath = Join-Path $PSScriptRoot $path.TrimStart('/').Replace('/', '\')
    
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentTypes = @{
            '.html' = 'text/html; charset=utf-8'
            '.css'  = 'text/css; charset=utf-8'
            '.js'   = 'application/javascript; charset=utf-8'
            '.webp' = 'image/webp'
            '.json' = 'application/json'
            '.png'  = 'image/png'
            '.jpg'  = 'image/jpeg'
            '.ico'  = 'image/x-icon'
        }
        $ct = $contentTypes[$ext]
        if (-not $ct) { $ct = 'application/octet-stream' }
        $ctx.Response.ContentType = $ct
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $ctx.Response.StatusCode = 404
    }
    $ctx.Response.Close()
}
