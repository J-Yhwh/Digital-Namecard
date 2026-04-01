


<template>
  <div class="card-wrapper">
    <div class="card">
      <!-- LEFT PANEL -->
      <div class="left">
        <div>
          <div class="name">{{ card.name }}</div>
          <div class="title">{{ card.title }}</div>
          <div class="quote">"{{ card.quote }}"</div>
        </div>
        <!-- QR Code Container -->
    <div class="p-6 bg-white rounded-2xl shadow-inner flex-row items-center justify-center">
      <QRCodeVue
        :value="qrValue"
        :size="140"
        level="H"
        foreground="#734F96"
        background="#E6E6FA"
     />
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="right">
        <template v-for="(item, index) in card.contacts" :key="item.label">
          <div class="contact-item">
            <span class="contact-icon">{{ item.icon }}</span>
            <span>
              <span class="contact-label">{{ item.label }}:</span>
              <span class="contact-value">
                <a v-if="item.href" :href="item.href" target="_blank">{{ item.value }}</a>
                <template v-else>{{ item.value }}</template>
              </span>
            </span>
          </div>
          <div v-if="index < card.contacts.length - 1" class="divider" />
        </template>

        <div class="buttons">
          <button class="btn" @click="handleShare">Share ↗</button>
          <button class="btn" @click="handleCopy">{{ copyLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup language = "ts">
import { ref , computed } from 'vue'
import QRCodeVue from 'qrcode.vue' 
import { useClipboard } from '@vueuse/core'


// Profile data
const profile = ref({
  name: "Jane Doe",
  title: "Back-end Developer",
  mobile1: "+65 8765 4321",
  mobile2: "+61 456789012",
  email: "anaconda@reptile.com",
  website: "https://github.com/J-Yhwh",
  bio: "Python is my kind of snake."
})

// vCard string
const vCard = computed(() => `
BEGIN:VCARD
Version 3.0
N:${profile.value.name};;;
FN:${profile.value.name}
TITLE:${profile.value.title}

TEL;TYPE=CELL,PREF:${profile.value.phone}

TEL;TYPE=CELL::65 807654321
TEL;TYPE=CELL:+61 456789012

EMAIL:${profile.value.email}
URL:${profile.value.website}
NOTE:${profile.value.bio}
END:VCARD
`); 

// NEW: Detect Android
const isAndroid = computed(() => /android/i.test(navigator.userAgent))

// Smart QR value
const qrValue = computed(() => {
  if (isAndroid.value) {
    return `${window.location.origin}/contact` // Directs to contact page for copy/save in Android OS
  }
  // iOS and others keep the raw vCard
  return vCard.value
})

// Clipboard helper
const { copy } = useClipboard()


const card = {
  name: 'Jane Doe',
  title: 'Backend Developer',
  quote: 'Python is my kind of snake.',
  contacts: [
    { icon: '📱', label: 'Mobile 1', value: '+65 87654321'},
    { icon: '📱', label: 'Mobile 2', value: '+61 456789012' },
    { icon: '📧', label: 'Email',    value: 'anaconda@reptile.com',       href: 'mailto:anaconda@reptile.com' },
    { icon: '🌐', label: 'Website',  value: 'https://github.com/J-Yhwh', href: 'https://github.com/J-Yhwh' },
  ],
}


const copyLabel = ref('Copy ⧉') 


// Improved Share function - uses full vCard
async function handleShare() {
  const shareData = {
    title: `${profile.value.name} - Digital Business Card`,
    text: `Contact ${profile.value.name}`,
    url: window.location.href,           // fallback URL
  }

  // Try to share the actual .vcf file (best experience)
  if (navigator.canShare && navigator.canShare({ files: [] })) {
    try {
      const blob = new Blob([vCard.value], { type: 'text/vcard' })
      const file = new File([blob], `${profile.value.name}.vcf`, { type: 'text/vcard' })

      await navigator.share({
        ...shareData,
        files: [file]
      })
      return
    } catch (err) {
      console.log('File sharing failed, falling back...', err)
    }
  }

  // Fallback: just share the page (still better than only GitHub)
  try {
    await navigator.share(shareData)
  } catch (err) {
    alert('Sharing not supported in this browser.')
  }
}

// Improved Copy function - copies the FULL vCard
async function handleCopy() {
  try {
    await navigator.clipboard.writeText(vCard.value)
    copyLabel.value = 'Copied ✓'
    
    setTimeout(() => {
      copyLabel.value = 'Copy ⧉'
    }, 2000)
  } catch (err) {
    alert('Failed to copy to clipboard.')
  }
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #2a2a35;
  font-family: 'Georgia', serif;
}

.card {
  background: #eceef8;
  width: 720px;
  height: 380px;
  border-radius: 18px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

/* LEFT */
.left {
  width: 260px;
  flex-shrink: 0;
  background: #dddff2;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #c8cadf;
}

.name  { font-size: 2rem; font-weight: 700; color: #1a1a2e; line-height: 1.15; letter-spacing: -0.5px; }
.title { font-size: 0.85rem; color: #555577; margin-top: 6px; }
.quote { font-size: 0.78rem; color: #6666aa; font-style: italic; line-height: 1.5; margin-top: 14px; border-left: 3px solid #aaaadd; padding-left: 10px; }

.qr-wrap { border-radius: 6px; display: block; }

/* RIGHT */
.right {
  flex: 1;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  background: #0d1b2e; /* ← navy blue */
}

.contact-item { display: flex; align-items: center; gap: 12px; font-size: 0.88rem; color: #e0e0f0; }
.contact-label { font-weight: 700; color: #ffffff; margin-right: 4px; }
.contact-value a { color: #9ab4ff; text-decoration: none; }
.divider { width: 100%; height: 1px; background: #2e3f5c; }
.btn { 
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 16px; border: 1.5px solid #4a5f7a; border-radius: 8px;
  background: transparent; color: #c0cfe0; font-size: 0.8rem;
  cursor: pointer; transition: background 0.2s, color 0.2s; font-family: inherit;
}
.btn:hover { background: #1a2d42; color: #ffffff; }
</style>
