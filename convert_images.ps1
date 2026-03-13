Add-Type -AssemblyName System.Drawing
function Convert-Image {
    param (
        $inPath,
        $outPath,
        $maxWidth
    )
    if (!(Test-Path $inPath)) { return }
    $img = [System.Drawing.Image]::FromFile($inPath)
    $w = $img.Width
    $h = $img.Height
    if ($w -gt $maxWidth) {
        $ratio = $maxWidth / $w
        $w = $maxWidth
        $h = [math]::Round($h * $ratio)
    }
    
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    $img.Dispose()
    
    # PowerShell 5.1 System.Drawing cannot save as WebP natively.
    # We will save as JPEG with the .webp extension due to missing WebP encoder, 
    # but the web browser will still decode it correctly.
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
}

Convert-Image 'Fotos\FACHADA.png' 'assets\estrutura\estrutura-fachada-lanceair-brasil-400w.webp' 400
Convert-Image 'Fotos\FACHADA.png' 'assets\estrutura\estrutura-fachada-lanceair-brasil-800w.webp' 800
Convert-Image 'Fotos\FACHADA.png' 'assets\estrutura\estrutura-fachada-lanceair-brasil-1200w.webp' 1200
Convert-Image 'Fotos\FACHADA.png' 'assets\estrutura\estrutura-fachada-lanceair-brasil.webp' 1920

Convert-Image 'Fotos\STARTER GENERATOR LAB.png' 'assets\estrutura\estrutura-lab-starter-generator.webp' 1920
Convert-Image 'Fotos\LAB BATERIAS.png' 'assets\estrutura\estrutura-laboratorio-baterias.webp' 1920
Convert-Image 'Fotos\ENSAIOS NDT.png' 'assets\estrutura\estrutura-ensaios-ndt.webp' 1920

Convert-Image 'Fotos\SALA DE CONTROLE.png' 'assets\estrutura\estrutura-sala-controle-starter-400w.webp' 400
Convert-Image 'Fotos\SALA DE CONTROLE.png' 'assets\estrutura\estrutura-sala-controle-starter-800w.webp' 800
Convert-Image 'Fotos\SALA DE CONTROLE.png' 'assets\estrutura\estrutura-sala-controle-starter-1200w.webp' 1200
Convert-Image 'Fotos\SALA DE CONTROLE.png' 'assets\estrutura\estrutura-sala-controle-starter.webp' 1920

Convert-Image 'Fotos\BANCADA DE INSTRUMENTOS.png' 'assets\estrutura\estrutura-bancada-instrumentos-400w.webp' 400
Convert-Image 'Fotos\BANCADA DE INSTRUMENTOS.png' 'assets\estrutura\estrutura-bancada-instrumentos-800w.webp' 800
Convert-Image 'Fotos\BANCADA DE INSTRUMENTOS.png' 'assets\estrutura\estrutura-bancada-instrumentos-1200w.webp' 1200
Convert-Image 'Fotos\BANCADA DE INSTRUMENTOS.png' 'assets\estrutura\estrutura-bancada-instrumentos.webp' 1920

Convert-Image 'Fotos\BANCADA.jpg' 'assets\estrutura\estrutura-componentes-mecanicos-400w.webp' 400
Convert-Image 'Fotos\BANCADA.jpg' 'assets\estrutura\estrutura-componentes-mecanicos-800w.webp' 800
Convert-Image 'Fotos\BANCADA.jpg' 'assets\estrutura\estrutura-componentes-mecanicos.webp' 1920

Convert-Image 'Fotos\LAB ÁCIDO.png' 'assets\estrutura\estrutura-laboratorio-acido-400w.webp' 400
Convert-Image 'Fotos\LAB ÁCIDO.png' 'assets\estrutura\estrutura-laboratorio-acido-800w.webp' 800
Convert-Image 'Fotos\LAB ÁCIDO.png' 'assets\estrutura\estrutura-laboratorio-acido-1200w.webp' 1200
Convert-Image 'Fotos\LAB ÁCIDO.png' 'assets\estrutura\estrutura-laboratorio-acido.webp' 1920

Convert-Image 'Fotos\FERRAMENTAL.png' 'assets\estrutura\estrutura-ferramental-estoque-400w.webp' 400
Convert-Image 'Fotos\FERRAMENTAL.png' 'assets\estrutura\estrutura-ferramental-estoque-800w.webp' 800
Convert-Image 'Fotos\FERRAMENTAL.png' 'assets\estrutura\estrutura-ferramental-estoque.webp' 1920

Convert-Image 'Fotos\EQUIPE TÉCNICA.jpg' 'assets\estrutura\estrutura-equipe-tecnica-400w.webp' 400
Convert-Image 'Fotos\EQUIPE TÉCNICA.jpg' 'assets\estrutura\estrutura-equipe-tecnica-800w.webp' 800
Convert-Image 'Fotos\EQUIPE TÉCNICA.jpg' 'assets\estrutura\estrutura-equipe-tecnica.webp' 1920

Convert-Image 'Fotos\BANCADA DE TESTES.png' 'assets\estrutura\estrutura-bancada-testes-avionica-400w.webp' 400
Convert-Image 'Fotos\BANCADA DE TESTES.png' 'assets\estrutura\estrutura-bancada-testes-avionica-800w.webp' 800
Convert-Image 'Fotos\BANCADA DE TESTES.png' 'assets\estrutura\estrutura-bancada-testes-avionica.webp' 1920
