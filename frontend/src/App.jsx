import { useEffect, useState } from 'react'
import './App.css'

const feedPosts = [
  {
    author: 'Blue Oak',
    title: 'Former Champion | Pallet Town',
    badge: 'Verified',
    badgeType: 'verified',
    avatar:
      'https://pbs.twimg.com/media/EjqV_B0X0AAv_M_.jpg',
    content:
      'Just finished a rigorous training session at Mt. Silver. The weather was harsh, but my Blastoise has never been stronger. Smell ya later, beginners! 💨',
    image:
      'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=2069&auto=format&fit=crop',
    likes: '1.2k Likes',
    comments: '45 Comments',
  },
  {
    author: 'Professor Oak',
    title: 'Head Researcher | Oak Labs',
    badge: null,
    avatar:
      'https://archives.bulbagarden.net/media/upload/thumb/3/30/Samuel_Oak_Masters.png/250px-Samuel_Oak_Masters.png',
    content:
      'Incredible breakthrough! We\'ve discovered a new behavioral pattern in local Oddish populations during the midnight sun. Science is truly marvelous! 🧬✨',
    image: null,
    likes: '890 Likes',
    comments: '12 Comments',
  },
  {
    author: 'Cynthia',
    title: 'Sinnoh League Champion | Myths & Legends',
    badge: 'Champion',
    badgeType: 'champion',
    avatar:
      'https://i.pinimg.com/736x/87/40/3e/87403e06385cf355877f9cdce5577661.jpg',
    content:
      'Studying the ancient murals at Celestic Town today. The bond between humans and Pokémon transcends time itself. Always curious, always learning. 📖🌒',
    image: null,
    video: true,
    likes: '5.6k Likes',
    comments: '230 Comments',
  },
]

const leftSidebarItems = {
  groups: ['⚡ Pokémon AI Developers', '🔥 Trainer Mentorship Circle', '💎 Global Pokémon Networking'],
  newsletters: ['📰 Weekly Pokémon Career Insights', '📰 Monthly Tech & Trainer Trends', '📰 Pokémon & AI Integration Updates'],
  events: ['🎉 Pokémon Hackathon 2025 - June 12', '🏆 Trainer Leadership Workshop - July 5', '🌐 Virtual Networking Meetup - August 18'],
}

const rightSidebarItems = {
  market: ['📈 AI in Pokémon Research is booming', '📊 PokéTech stocks rise 12%', '📉 Johto VR Market dips slightly'],
  hiring: ['💼 PikachuTech hiring Front-End Devs', '💼 Elite Four Labs: Data Analyst', '💼 PokéAI: Machine Learning Assistant'],
}

const onboardingSteps = [
  {
    speaker: 'pika',
    text: 'Pika-pika! [POKÉ-AI SYSTEM INITIALIZED] Welcome, Trainer! I am System A-1, your primary networking assistant. I\'ve scanned the network and found many opportunities for you!',
    target: null,
  },
  {
    speaker: 'eevee',
    text: 'And I am System A-2! I\'ll be handling your adaptability and growth protocols. Together, we\'ll make sure you become the top-tier Trainer in the professional world!',
    target: null,
  },
  {
    speaker: 'pika',
    text: 'Accessing Navigation Module... Use this uplink to explore different sectors like your Trainer Card and the Battle Gyms. Stay connected!',
    target: 'header',
  },
  {
    speaker: 'eevee',
    text: 'Scanning Trainer Status... This Snapshot displays your current influence level. Keep track of your views and connections here.',
    target: '.trainer-snapshot',
  },
  {
    speaker: 'pika',
    text: 'Opening Feed Channel... This is where you transmit your achievements and research to other Trainers in the network.',
    target: '.post-creator',
  },
  {
    speaker: 'eevee',
    text: 'Analyzing External Clusters... Check these sectors for specialized Groups and Newsletters to optimize your knowledge base.',
    target: '.left-sidebar .sidebar-box:nth-child(2)',
  },
  {
    speaker: 'pika',
    text: 'Monitoring Market Trends... The right-side interface highlights career surges and hiring signals. Don\'t miss out, Trainer!',
    target: '.right-sidebar',
  },
  {
    speaker: 'eevee',
    text: 'All systems go! We\'ll remain in your system as your AI assistants. You can summon us anytime via the helper icon in the corner!',
    target: null,
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted')
    if (!onboardingCompleted) {
      const timer = setTimeout(() => {
        setOnboardingOpen(true)
        setCurrentStep(0)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!onboardingOpen) return

    const fullText = onboardingSteps[currentStep]?.text || ''
    setTypedText('')
    setIsTyping(true)

    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTypedText(fullText.slice(0, index))

      if (index >= fullText.length) {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [currentStep, onboardingOpen])

  const handleNext = () => {
    if (isTyping) return

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((step) => step + 1)
      return
    }

    setOnboardingOpen(false)
    localStorage.setItem('onboardingCompleted', 'true')
  }

  const handleSkip = () => {
    setOnboardingOpen(false)
    localStorage.setItem('onboardingCompleted', 'true')
  }

  const activeSpeaker = onboardingSteps[currentStep]?.speaker || 'pika'

  return (
    <div className="app-shell">
      <header>
        <div className="container header-container">
          <h1 className="logo">
            <span className="pokeball-logo" aria-hidden="true" />
            PokéLink
          </h1>
          <div className="menu-icon" onClick={() => setMenuOpen((open) => !open)}>
            <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <nav className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Network</a></li>
              <li><a href="#">Gyms</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container main-layout">
        <section className="hero">
          <div className="container hero-content">
            <h2>Connect, Train, and Grow Your Career</h2>
            <p>
              “Every connection is a step toward mastery—build your professional
              Pokédex one network at a time.” — PokéLink
            </p>
            <a href="#" className="btn">Get Started</a>
          </div>
          <img
            src="https://images.wikidexcdn.net/mwuploads/wikidex/2/2e/latest/20240727192648/Pikachu.png"
            className="pokemon pikachu"
            alt="Pikachu"
          />
          <img
            src="https://images.wikidexcdn.net/mwuploads/wikidex/4/4a/latest/20250111085022/Eevee.png"
            className="pokemon eevee"
            alt="Eevee"
          />
          <div className="sparkle sparkle1" />
          <div className="sparkle sparkle2" />
          <div className="sparkle sparkle3" />
          <div className="sparkle sparkle4" />
          <div className="sparkle sparkle5" />
        </section>

        <div className="page-layout">
          <aside className="left-sidebar">
            <section className="sidebar-box trainer-snapshot">
              <div className="snapshot-header" />
              <div className="snapshot-content">
                <img
                  src="https://i.pinimg.com/736x/fa/71/70/fa717003033a844eb6aa4970fc2acbcd.jpg"
                  className="snapshot-avatar"
                  alt="User"
                />
                <h3>Debanshika Das</h3>
                <p>Ace Trainer | Full-Stack Dev</p>
                <div className="snapshot-stats">
                  <div className="s-stat"><span>Views</span><strong>142</strong></div>
                  <div className="s-stat"><span>Connections</span><strong>520</strong></div>
                </div>
              </div>
              <div className="snapshot-footer">
                <a href="#">My Trainer Card <i className="fas fa-arrow-right" /></a>
              </div>
            </section>

            <section className="sidebar-box">
              <h2>Groups</h2>
              <ul>
                {leftSidebarItems.groups.map((item) => (
                  <li key={item} onClick={() => alert('Feature coming soon!')}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="sidebar-box">
              <h2>Newsletters</h2>
              <ul>
                {leftSidebarItems.newsletters.map((item) => (
                  <li key={item} onClick={() => alert('Feature coming soon!')}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="sidebar-box">
              <h2>Events</h2>
              <ul>
                {leftSidebarItems.events.map((item) => (
                  <li key={item} onClick={() => alert('Feature coming soon!')}>{item}</li>
                ))}
              </ul>
            </section>
          </aside>

          <main className="main-feed">
            <div className="post-creator">
              <div className="creator-top">
                <img
                  src="https://i.pinimg.com/736x/fa/71/70/fa717003033a844eb6aa4970fc2acbcd.jpg"
                  className="user-avatar"
                  alt="User"
                />
                <button type="button" className="create-post-btn">Share your journey, Trainer...</button>
              </div>
              <div className="creator-bottom">
                <div className="action"><i className="fas fa-camera" /> Photo</div>
                <div className="action"><i className="fas fa-video" /> Video</div>
                <div className="action"><i className="fas fa-calendar-alt" /> Event</div>
                <div className="action"><i className="fas fa-newspaper" /> Write Article</div>
              </div>
            </div>

            <div className="feed-posts">
              {feedPosts.map((post) => (
                <article className="feed-post" key={post.author}>
                  <div className="post-header">
                    <img src={post.avatar} className="post-avatar" alt={post.author} />
                    <div className="post-meta">
                      <h4>
                        {post.author}
                        {post.badge && (
                          <span className={`badge ${post.badgeType || ''}`}>
                            <i className={post.badgeType === 'verified' ? 'fas fa-certificate' : 'fas fa-crown'} />
                            {post.badge}
                          </span>
                        )}
                      </h4>
                      <p>{post.title}</p>
                    </div>
                    <i className="fas fa-ellipsis-h more" />
                  </div>
                  <div className="post-content">
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} className="post-img" alt="Post" />}
                    {post.video && (
                      <div className="video-placeholder">
                        <i className="fas fa-play" />
                        <p>Watch Battle Recording</p>
                      </div>
                    )}
                  </div>
                  <div className="post-actions">
                    <span><i className="far fa-heart" /> {post.likes}</span>
                    <span><i className="far fa-comment" /> {post.comments}</span>
                    <span><i className="fas fa-share-alt" /> Share</span>
                  </div>
                </article>
              ))}
            </div>
          </main>

          <aside className="right-sidebar">
            <section className="sidebar-box">
              <h2>Market News</h2>
              <ul>
                {rightSidebarItems.market.map((item) => (
                  <li key={item} onClick={() => alert('Feature coming soon!')}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="sidebar-box">
              <h2>Hiring Now</h2>
              <ul>
                {rightSidebarItems.hiring.map((item) => (
                  <li key={item} onClick={() => alert('Feature coming soon!')}>{item}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>

      <footer>
        <div className="container">
          © 2026 PokéLink • Built for trainers, innovators, and ambitious Pokémon professionals.
        </div>
      </footer>

      <button type="button" className="ai-assistant-helper" onClick={() => setOnboardingOpen(true)}>
        <span className="helper-pulse" />
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
          alt="Poké AI helper"
        />
      </button>

      {onboardingOpen && (
        <div className="onboarding-overlay active">
          <div className="onboarding-content">
            <div className="system-status">
              <span className="status-dot" />
              <span>AI SYSTEM ONLINE</span>
            </div>

            <div className="character-container">
              <div className={`character-wrapper ${activeSpeaker === 'pika' ? 'active-speaker' : ''}`}>
                <img
                  className="guide-character"
                  src="https://images.wikidexcdn.net/mwuploads/wikidex/2/2e/latest/20240727192648/Pikachu.png"
                  alt="Pikachu"
                />
                <span className="char-label">System A-1</span>
              </div>
              <div className={`character-wrapper ${activeSpeaker === 'eevee' ? 'active-speaker' : ''}`}>
                <img
                  className="guide-character"
                  src="https://images.wikidexcdn.net/mwuploads/wikidex/4/4a/latest/20250111085022/Eevee.png"
                  alt="Eevee"
                />
                <span className="char-label">System A-2</span>
              </div>
            </div>

            <div className="speech-bubble holographic">
              <span className="ai-badge">POKÉ-AI</span>
              <p>{typedText}<span className="cursor">|</span></p>

              <div className="onboarding-actions">
                <button type="button" className="btn-skip" onClick={handleSkip}>Skip</button>
                <button type="button" className="btn-next" onClick={handleNext}>
                  {currentStep === onboardingSteps.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
