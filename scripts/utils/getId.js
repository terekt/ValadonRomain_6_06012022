async function photographerID() {
    const url = new URL(window.document.location.href).searchParams.get('id');
    return (url);
}