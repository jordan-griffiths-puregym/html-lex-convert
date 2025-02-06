param (
    [int]$RevisionVersion
)

$imageName = "i7657043/convert-to-lexical-expressapi:latest"

docker build -t $imageName .

docker push $imageName

az containerapp update `
    -n convert-to-lexical-expressapi -g convert-to-lexical `
    --revision-suffix "v$RevisionVersion" `
    --image "docker.io/$imageName" `
    --replace-env-vars CONVERT_KEY="12345" `
    NODE_ENV="production"