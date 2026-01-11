# Script pour synchroniser la base de données de production Vercel
# IMPORTANT: Remplacez la ligne ci-dessous par votre VRAIE URL de production

$PROD_URL = "REMPLACEZ_PAR_VOTRE_URL_POSTGRES"

# Vérification
if ($PROD_URL -eq "REMPLACEZ_PAR_VOTRE_URL_POSTGRES") {
    Write-Host "❌ ERREUR: Vous devez d'abord modifier ce script!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ouvrez le fichier 'sync-production-db.ps1' et remplacez:" -ForegroundColor Yellow
    Write-Host '  $PROD_URL = "REMPLACEZ_PAR_VOTRE_URL_POSTGRES"' -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Par votre vraie URL de production (copiée depuis Vercel > Storage)" -ForegroundColor Yellow
    Write-Host "Exemple: postgres://default:AbC123...@ep-xxx.aws.neon.tech:5432/verceldb?sslmode=require" -ForegroundColor Cyan
    exit 1
}

Write-Host "🔧 Synchronisation de la base de données de production..." -ForegroundColor Cyan
Write-Host ""

# Étape 1: Sauvegarder le schema actuel
Write-Host "📦 Sauvegarde du schema local..." -ForegroundColor Yellow
Copy-Item "prisma\schema.prisma" "prisma\schema.prisma.backup"

# Étape 2: Modifier temporairement le schema pour Postgres
Write-Host "🔄 Configuration temporaire pour Postgres..." -ForegroundColor Yellow
$schemaContent = Get-Content "prisma\schema.prisma" -Raw
$schemaContent = $schemaContent -replace 'provider = "sqlite"', 'provider = "postgresql"'
$schemaContent = $schemaContent -replace 'url\s*=\s*env\("DATABASE_URL"\)', 'url = env("POSTGRES_PRISMA_URL")'
Set-Content "prisma\schema.prisma" $schemaContent

# Étape 3: Définir la variable d'environnement
Write-Host "🔑 Configuration de l'URL de production..." -ForegroundColor Yellow
$env:POSTGRES_PRISMA_URL = $PROD_URL

# Étape 4: Pousser le schema vers la production
Write-Host "🚀 Envoi du schema vers Vercel..." -ForegroundColor Green
npx prisma db push

# Étape 5: Restaurer le schema local
Write-Host "♻️ Restauration du schema local..." -ForegroundColor Yellow
Move-Item "prisma\schema.prisma.backup" "prisma\schema.prisma" -Force

# Étape 6: Régénérer le client Prisma
Write-Host "🔨 Régénération du client Prisma..." -ForegroundColor Yellow
npx prisma generate

Write-Host ""
Write-Host "✅ Synchronisation terminée!" -ForegroundColor Green
Write-Host "Votre site Vercel devrait maintenant fonctionner." -ForegroundColor Green
Write-Host "Rafraîchissez la page: https://idmisk-eight.vercel.app" -ForegroundColor Cyan
