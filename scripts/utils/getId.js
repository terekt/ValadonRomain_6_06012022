async function photographerID() {
    const url = new URL(window.document.location.href).searchParams.get('id'); // récupère l'id de la page
    return (url);
}