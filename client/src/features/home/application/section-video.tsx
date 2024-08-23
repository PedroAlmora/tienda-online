export default function VideoSection() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50%', overflow: 'hidden' }}>
        <video width="100%" height="50%" autoPlay loop muted controls style={{ maxHeight: '50%', objectFit: 'cover' }}>
          <source src="/Video TMP com y redu.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
    );
  }