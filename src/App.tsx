import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import {
  brand,
  contact,
  editorialShots,
  faqs,
  galleryFilters,
  galleryItems,
  heroCopy,
  navItems,
  reservationLink,
  services,
  studioNotes,
  type FilterKey,
  type GalleryItem,
} from './data/siteData'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const categoryMap: Record<FilterKey, string> = {
  Todas: 'Todas',
  Minimal: 'Minimal',
  Francesa: 'Francesa',
  'Nail art': 'Nail art',
}

function App() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Todas')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0)
  const [selectedService, setSelectedService] = useState(services[0].name)
  const [sceneProgress, setSceneProgress] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const heroSceneRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)

    updateMotion()
    media.addEventListener?.('change', updateMotion)

    try {
      const canvas = document.createElement('canvas')
      const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setHasWebGL(Boolean(webgl))
    } catch {
      setHasWebGL(false)
    }

    return () => media.removeEventListener?.('change', updateMotion)
  }, [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2,
      })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useLayoutEffect(() => {
    if (!heroSceneRef.current || reducedMotion) {
      return
    }

    const section = heroSceneRef.current
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => setSceneProgress(self.progress),
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const filteredGallery =
    activeFilter === 'Todas'
      ? galleryItems
      : galleryItems.filter((item) => item.category === categoryMap[activeFilter])

  const reservationUrl =
    reservationLink && selectedService
      ? `${reservationLink}${reservationLink.includes('?') ? '&' : '?'}text=${encodeURIComponent(
          `Hola FORMA Nail Studio, quiero reservar ${selectedService}.`,
        )}`
      : ''

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="brand-block" aria-label="FORMA Nail Studio">
          <span className="brand-mark">F</span>
          <span className="brand-copy">
            <strong>{brand.name}</strong>
            <small>{brand.subName}</small>
          </span>
        </div>

        <nav className="site-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-button" href="#contacto">
          Reservar
        </a>
      </header>

      <main>
        <section className="hero-section" id="inicio" ref={heroSceneRef}>
          <span className="section-label section-label-left">ESTUDIO</span>
          <span className="section-label section-label-right">MANICURA</span>

          <div className="hero-sync">
            <div className="hero-copy">
              <p className="eyebrow">{heroCopy.eyebrow}</p>
              <h1>
                {heroCopy.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="hero-subtitle">{heroCopy.subtitle}</p>
              <div className="hero-actions">
                <a className="primary-button" href="#servicios">
                  {heroCopy.cta}
                </a>
              </div>
            </div>

            <div className="hero-canvas-shell">
              <div className="drag-hint">Gira</div>
              {hasWebGL && !reducedMotion ? (
                <Canvas
                  dpr={[1, 1.8]}
                  camera={{ position: [0, 0, 7], fov: 30 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Suspense fallback={null}>
                    <HeroScene progress={sceneProgress} mouse={mouse} reducedMotion={reducedMotion} />
                  </Suspense>
                </Canvas>
              ) : (
                <div className="hero-fallback">
                  <img
                    src="https://images.unsplash.com/photo-1521590832167-7e3fe1f6f5f4?auto=format&fit=crop&w=1200&q=80"
                    alt="Manicura editorial con diseño cuidado"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="services section" id="servicios">
          <div className="section-intro">
            <p className="eyebrow eyebrow-dark">Servicios</p>
            <h2>Manicura pensada para cada mirada.</h2>
            <p className="section-note">
              Una atención discreta, precisa y con un resultado limpio, luminoso y elegante.
            </p>
          </div>

          <div className="services-list" role="list">
            {services.map((service, index) => (
              <article className="service-item" key={service.id} role="listitem">
                <div className="service-index">0{index + 1}</div>
                <div className="service-body">
                  <div className="service-topline">
                    <h3>{service.name}</h3>
                    <span>{service.price}</span>
                  </div>
                  <div className="service-meta">
                    <p>{service.description}</p>
                    <strong>{service.duration}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="service-select"
                  onClick={() => setSelectedService(service.name)}
                  aria-label={`Seleccionar servicio ${service.name}`}
                >
                  Elegir
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery section" id="galeria">
          <div className="section-intro gallery-intro">
            <div>
              <p className="eyebrow eyebrow-dark">Galería</p>
              <h2>Detalles que cuentan.</h2>
            </div>

            <div className="filter-group" aria-label="Filtros de galería">
              {galleryFilters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={filter === activeFilter ? 'filter active' : 'filter'}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={filter === activeFilter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <button
                type="button"
                key={item.id}
                className="gallery-item"
                onClick={() => setSelectedImage(item)}
                aria-label={`Abrir imagen ${item.title}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="feature-band">
          <div className="feature-band-inner">
            <p className="eyebrow eyebrow-light">Forma de trabajo</p>
            <h2>PEQUEÑOS DETALLES. MUCHA PERSONALIDAD.</h2>
          </div>

          <div className="feature-collage" aria-label="Composición editorial de manos y esmaltes">
            {editorialShots.blackSection.map((src, index) => (
              <img
                key={src + index}
                src={src}
                alt="Editorial de manicura en tonos cálidos"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        <section className="studio section" id="estudio">
          <div className="studio-image">
            <img src={editorialShots.studioPortrait} alt="Detalle de manos con manicura cuidada" loading="lazy" />
          </div>

          <div className="studio-copy">
            <p className="eyebrow eyebrow-dark">El estudio</p>
            <h2>Un trato cuidado, una mirada precisa.</h2>

            <div className="studio-list">
              {studioNotes.map((note, index) => (
                <div className="studio-note" key={note}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faq section">
          <div className="section-intro faq-intro">
            <p className="eyebrow eyebrow-dark">FAQ</p>
            <h2>Preguntas frecuentes.</h2>
          </div>

          <div className="faq-list" aria-label="Preguntas frecuentes">
            {faqs.map((item, index) => {
              const isOpen = activeQuestion === index

              return (
                <div className={isOpen ? 'faq-item open' : 'faq-item'} key={item.question}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setActiveQuestion(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className="faq-indicator" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && <p className="faq-answer">{item.answer}</p>}
                </div>
              )
            })}
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-panel">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-dark">Contacto</p>
              <h2>Reserva tu próxima cita.</h2>
              <p className="contact-hours">{contact.hours}</p>
            </div>

            <div className="contact-actions">
              {reservationLink ? (
                <a
                  className="primary-button primary-button--dark"
                  href={reservationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.reserveLabel}
                </a>
              ) : (
                <p className="booking-note" role="note">
                  {contact.bookingUnavailable}
                </p>
              )}
              <p className="contact-note">{contact.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span>{brand.name}</span>
          <small>{brand.subName}</small>
        </div>
        <p>Proyecto de muestra · Marca ficticia</p>
      </footer>

      {selectedImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar visor"
          >
            ×
          </button>
          <div className="lightbox-panel">
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-meta">
              <p className="eyebrow eyebrow-dark">{selectedImage.category}</p>
              <h3 id="gallery-title">{selectedImage.title}</h3>
              <p>{selectedImage.source}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HeroScene({
  progress,
  mouse,
  reducedMotion,
}: {
  progress: number
  mouse: { x: number; y: number }
  reducedMotion: boolean
}) {
  const { camera } = useThree()
  const bottleRef = useRef<THREE.Group>(null)
  const jarRef = useRef<THREE.Group>(null)
  const fileRef = useRef<THREE.Group>(null)
  const dragState = useRef({ active: false, lastX: 0, value: 0 })

  useFrame(() => {
    const t = clamp(progress, 0, 1)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, -0.65 + mouse.x * 0.38 + (1 - t) * 0.8, 0.07)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.25 + mouse.y * 0.2 - t * 0.5, 0.07)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.2 - t * 2.5, 0.07)
    camera.lookAt(0, 0.25, 0)

    if (bottleRef.current) {
      bottleRef.current.position.x = THREE.MathUtils.lerp(bottleRef.current.position.x, -0.85 + mouse.x * 0.4 + t * 1.65, 0.08)
      bottleRef.current.position.y = THREE.MathUtils.lerp(bottleRef.current.position.y, 0.3 - t * 0.9 + mouse.y * 0.12, 0.08)
      bottleRef.current.rotation.y = THREE.MathUtils.lerp(
        bottleRef.current.rotation.y,
        -0.6 + t * 1.7 + mouse.x * 0.8 + dragState.current.value,
        0.08,
      )
      bottleRef.current.rotation.x = THREE.MathUtils.lerp(bottleRef.current.rotation.x, 0.2 + mouse.y * 0.4, 0.08)
    }

    if (jarRef.current) {
      jarRef.current.position.x = THREE.MathUtils.lerp(jarRef.current.position.x, 1.25 - t * 1.2, 0.08)
      jarRef.current.position.y = THREE.MathUtils.lerp(jarRef.current.position.y, -0.3 - t * 0.8, 0.08)
      jarRef.current.rotation.z = THREE.MathUtils.lerp(jarRef.current.rotation.z, 0.25 - t * 0.5, 0.08)
      jarRef.current.rotation.y = THREE.MathUtils.lerp(jarRef.current.rotation.y, 0.5 + t * 0.8, 0.08)
    }

    if (fileRef.current) {
      fileRef.current.position.x = THREE.MathUtils.lerp(fileRef.current.position.x, 0.35 + t * 1.1, 0.08)
      fileRef.current.position.y = THREE.MathUtils.lerp(fileRef.current.position.y, -1.45 + t * 0.65, 0.08)
      fileRef.current.rotation.z = THREE.MathUtils.lerp(fileRef.current.rotation.z, -1.15 + t * 0.7, 0.08)
      fileRef.current.rotation.y = THREE.MathUtils.lerp(fileRef.current.rotation.y, 0.2 + t * 0.4, 0.08)
    }
  })

  if (reducedMotion) {
    return (
      <>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1.8} />
        <BottleModel dragState={dragState} reducedMotion />
        <JarModel />
        <FileModel />
        <ContactShadows position={[0, -2.8, 0]} opacity={0.24} scale={12} blur={2.8} far={7} />
      </>
    )
  }

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} />
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <group ref={bottleRef}>
          <BottleModel dragState={dragState} />
        </group>
      </Float>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <group ref={jarRef}>
          <JarModel />
        </group>
      </Float>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
        <group ref={fileRef}>
          <FileModel />
        </group>
      </Float>
      <ContactShadows position={[0, -2.8, 0]} opacity={0.2} scale={12} blur={2.6} far={7} />
    </>
  )
}

function BottleModel({ dragState, reducedMotion = false }: { dragState: React.MutableRefObject<{ active: boolean; lastX: number; value: number }>; reducedMotion?: boolean }) {
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (event: any) => {
    if (window.innerWidth <= 768 || reducedMotion) {
      return
    }

    event.stopPropagation()
    dragState.current.active = true
    dragState.current.lastX = event.point.x
    setIsDragging(true)
  }

  const handlePointerMove = (event: any) => {
    if (!dragState.current.active || reducedMotion) {
      return
    }

    const dx = event.point.x - dragState.current.lastX
    dragState.current.value += dx * 0.55
    dragState.current.lastX = event.point.x
  }

  const handlePointerUp = () => {
    dragState.current.active = false
    setIsDragging(false)
  }

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <RoundedBox args={[1.7, 2.4, 1.5]} radius={0.2} smoothness={6} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={isDragging ? '#d7b2b5' : '#f2d6df'}
          metalness={0.06}
          roughness={0.28}
          transmission={0.14}
          clearcoat={1}
          clearcoatRoughness={0.28}
        />
      </RoundedBox>
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.85, 32]} />
        <meshStandardMaterial color="#f2ece6" metalness={0.2} roughness={0.52} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.32, 32]} />
        <meshStandardMaterial color="#d9b3b8" metalness={0.22} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.38, 0.8]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 1.15, 32]} />
        <meshStandardMaterial color="#efe3d8" metalness={0.15} roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 0.2, 0.84]} rotation={[0.22, 0.2, 0.35]}>
        <boxGeometry args={[0.68, 0.18, 0.12]} />
        <meshStandardMaterial color="#d1b2bd" roughness={0.65} />
      </mesh>
      <mesh position={[-0.3, -0.1, 0.84]} rotation={[0.15, -0.2, -0.35]}>
        <boxGeometry args={[0.72, 0.12, 0.12]} />
        <meshStandardMaterial color="#d2c5d9" roughness={0.7} />
      </mesh>
    </group>
  )
}

function JarModel() {
  return (
    <group>
      <RoundedBox args={[1.7, 1.8, 1.7]} radius={0.18} smoothness={6} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#f1d9d8" metalness={0.04} roughness={0.44} clearcoat={0.9} clearcoatRoughness={0.2} />
      </RoundedBox>
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.42, 32]} />
        <meshStandardMaterial color="#f5ece7" metalness={0.14} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.37, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.2, 32]} />
        <meshStandardMaterial color="#c99ba5" metalness={0.18} roughness={0.38} />
      </mesh>
    </group>
  )
}

function FileModel() {
  return (
    <group>
      <RoundedBox args={[2.5, 0.55, 0.88]} radius={0.18} smoothness={8} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e9d1c7" roughness={0.72} metalness={0.18} />
      </RoundedBox>
      <mesh position={[0, 0.1, 0.1]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[2.1, 0.12, 0.38]} />
        <meshStandardMaterial color="#d9b8b3" roughness={0.72} />
      </mesh>
    </group>
  )
}

export default App
