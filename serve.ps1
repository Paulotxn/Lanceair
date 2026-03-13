$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:9090/")
$listener.Start()
Write-Host "Server started on http://localhost:9090/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.LocalPath
    
    if ($path -eq "/") { $path = "/index.html" }
    
    $basePath = "c:\Users\Administrator\.gemini\antigravity\scratch\lanceair-mro"
    $filePath = Join-Path $basePath $path.TrimStart("/").Replace("/", "\")
    
    Write-Host "$($request.HttpMethod) $path"
    
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = switch ($ext) {
            ".html"  { "text/html; charset=utf-8" }
            ".css"   { "text/css; charset=utf-8" }
            ".js"    { "application/javascript; charset=utf-8" }
            ".webp"  { "image/webp" }
            ".png"   { "image/png" }
            ".jpg"   { "image/jpeg" }
            ".jpeg"  { "image/jpeg" }
            ".json"  { "application/json" }
            ".svg"   { "image/svg+xml" }
            ".woff2" { "font/woff2" }
            default  { "application/octet-stream" }
        }
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        Write-Host "  404 NOT FOUND: $filePath"
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $path")
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    
    $response.Close()
}
