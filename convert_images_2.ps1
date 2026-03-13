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
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
}

Convert-Image 'Fotos\AMBIENTE DE TRABALHO.png' 'assets\estrutura\estrutura-ambiente-trabalho-400w.webp' 400
Convert-Image 'Fotos\AMBIENTE DE TRABALHO.png' 'assets\estrutura\estrutura-ambiente-trabalho-800w.webp' 800
Convert-Image 'Fotos\AMBIENTE DE TRABALHO.png' 'assets\estrutura\estrutura-ambiente-trabalho-1200w.webp' 1200
Convert-Image 'Fotos\AMBIENTE DE TRABALHO.png' 'assets\estrutura\estrutura-ambiente-trabalho.webp' 1920

Convert-Image 'Fotos\ÁREA DE TRABALHO.png' 'assets\estrutura\estrutura-area-trabalho-eletronica-400w.webp' 400
Convert-Image 'Fotos\ÁREA DE TRABALHO.png' 'assets\estrutura\estrutura-area-trabalho-eletronica-800w.webp' 800
Convert-Image 'Fotos\ÁREA DE TRABALHO.png' 'assets\estrutura\estrutura-area-trabalho-eletronica-1200w.webp' 1200
Convert-Image 'Fotos\ÁREA DE TRABALHO.png' 'assets\estrutura\estrutura-area-trabalho-eletronica.webp' 1920

Convert-Image 'Fotos\BATERIAS NICD.png' 'assets\estrutura\estrutura-baterias-nicd-aeronauticas-400w.webp' 400
Convert-Image 'Fotos\BATERIAS NICD.png' 'assets\estrutura\estrutura-baterias-nicd-aeronauticas-800w.webp' 800
Convert-Image 'Fotos\BATERIAS NICD.png' 'assets\estrutura\estrutura-baterias-nicd-aeronauticas-1200w.webp' 1200
Convert-Image 'Fotos\BATERIAS NICD.png' 'assets\estrutura\estrutura-baterias-nicd-aeronauticas.webp' 1920

Convert-Image 'Fotos\EQUIPAMENTO NICD.png' 'assets\estrutura\estrutura-equipamento-analise-nicd-400w.webp' 400
Convert-Image 'Fotos\EQUIPAMENTO NICD.png' 'assets\estrutura\estrutura-equipamento-analise-nicd-800w.webp' 800
Convert-Image 'Fotos\EQUIPAMENTO NICD.png' 'assets\estrutura\estrutura-equipamento-analise-nicd-1200w.webp' 1200
Convert-Image 'Fotos\EQUIPAMENTO NICD.png' 'assets\estrutura\estrutura-equipamento-analise-nicd.webp' 1920

Convert-Image 'Fotos\EQUIPAMENTOS.png' 'assets\estrutura\estrutura-equipe-tecnica-computador-400w.webp' 400
Convert-Image 'Fotos\EQUIPAMENTOS.png' 'assets\estrutura\estrutura-equipe-tecnica-computador-800w.webp' 800
Convert-Image 'Fotos\EQUIPAMENTOS.png' 'assets\estrutura\estrutura-equipe-tecnica-computador-1200w.webp' 1200
Convert-Image 'Fotos\EQUIPAMENTOS.png' 'assets\estrutura\estrutura-equipe-tecnica-computador.webp' 1920

Convert-Image 'Fotos\LABORATÓRIO.png' 'assets\estrutura\estrutura-laboratorio-principal-400w.webp' 400
Convert-Image 'Fotos\LABORATÓRIO.png' 'assets\estrutura\estrutura-laboratorio-principal-800w.webp' 800
Convert-Image 'Fotos\LABORATÓRIO.png' 'assets\estrutura\estrutura-laboratorio-principal-1200w.webp' 1200
Convert-Image 'Fotos\LABORATÓRIO.png' 'assets\estrutura\estrutura-laboratorio-principal.webp' 1920

Convert-Image 'Fotos\OFICINA.jpg' 'assets\estrutura\estrutura-oficina-principal-400w.webp' 400
Convert-Image 'Fotos\OFICINA.jpg' 'assets\estrutura\estrutura-oficina-principal-800w.webp' 800
Convert-Image 'Fotos\OFICINA.jpg' 'assets\estrutura\estrutura-oficina-principal-1200w.webp' 1200
Convert-Image 'Fotos\OFICINA.jpg' 'assets\estrutura\estrutura-oficina-principal.webp' 1920

Convert-Image 'Fotos\PEÇAS.jpg' 'assets\estrutura\estrutura-pecas-aeronauticas-400w.webp' 400
Convert-Image 'Fotos\PEÇAS.jpg' 'assets\estrutura\estrutura-pecas-aeronauticas-800w.webp' 800
Convert-Image 'Fotos\PEÇAS.jpg' 'assets\estrutura\estrutura-pecas-aeronauticas-1200w.webp' 1200
Convert-Image 'Fotos\PEÇAS.jpg' 'assets\estrutura\estrutura-pecas-aeronauticas.webp' 1920

Convert-Image 'Fotos\SALA TÉCNICA.png' 'assets\estrutura\estrutura-sala-tecnica-400w.webp' 400
Convert-Image 'Fotos\SALA TÉCNICA.png' 'assets\estrutura\estrutura-sala-tecnica-800w.webp' 800
Convert-Image 'Fotos\SALA TÉCNICA.png' 'assets\estrutura\estrutura-sala-tecnica-1200w.webp' 1200
Convert-Image 'Fotos\SALA TÉCNICA.png' 'assets\estrutura\estrutura-sala-tecnica.webp' 1920

Convert-Image 'Fotos\STARTER GENERATOR.png' 'assets\estrutura\estrutura-starter-generator-bancada-400w.webp' 400
Convert-Image 'Fotos\STARTER GENERATOR.png' 'assets\estrutura\estrutura-starter-generator-bancada-800w.webp' 800
Convert-Image 'Fotos\STARTER GENERATOR.png' 'assets\estrutura\estrutura-starter-generator-bancada-1200w.webp' 1200
Convert-Image 'Fotos\STARTER GENERATOR.png' 'assets\estrutura\estrutura-starter-generator-bancada.webp' 1920

Convert-Image 'Fotos\TESTE NICD.png' 'assets\estrutura\estrutura-teste-baterias-nicd-400w.webp' 400
Convert-Image 'Fotos\TESTE NICD.png' 'assets\estrutura\estrutura-teste-baterias-nicd-800w.webp' 800
Convert-Image 'Fotos\TESTE NICD.png' 'assets\estrutura\estrutura-teste-baterias-nicd-1200w.webp' 1200
Convert-Image 'Fotos\TESTE NICD.png' 'assets\estrutura\estrutura-teste-baterias-nicd.webp' 1920

Convert-Image 'Fotos\USINAGEM.png' 'assets\estrutura\estrutura-usinagem-rotor-400w.webp' 400
Convert-Image 'Fotos\USINAGEM.png' 'assets\estrutura\estrutura-usinagem-rotor-800w.webp' 800
Convert-Image 'Fotos\USINAGEM.png' 'assets\estrutura\estrutura-usinagem-rotor-1200w.webp' 1200
Convert-Image 'Fotos\USINAGEM.png' 'assets\estrutura\estrutura-usinagem-rotor.webp' 1920
