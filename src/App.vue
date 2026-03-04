
<script setup lang="ts">
import { ref, computed } from 'vue'
import QRCodeVue from 'qrcode.vue'
import { useClipboard } from '@vueuse/core'

// Profile data
const profile = ref({
  name: 'Jane Doe',
  title: 'Privacy & Data Analyst',
  phone: '+65 9123 4567',
  email: 'abc@example.com',
  website: 'https://github.com/J-Yhwh',
  linkedin: 'https://linkedin.com/in/your_name',
  location: 'Singapore',
  bio: 'Building tools to understand browser tracking & privacy'
})

// vCard string
const vCard = computed(() => `
BEGIN:VCARD
VERSION:3.0
N:${profile.value.name};;;
FN:${profile.value.name}
TITLE:${profile.value.title}
TEL;TYPE=CELL:${profile.value.phone}
EMAIL:${profile.value.email}
URL:${profile.value.website}
NOTE:${profile.value.bio}
END:VCARD
`)

// QR value
const qrValue = computed(() => vCard.value)

// Clipboard helper
const { copy } = useClipboard()

// Copy fallback
const copyVCard = async () => {
  await copy(vCard.value)
  alert('vCard copied! Paste into contacts or share.')
}

// Share (with fallback)
const shareCard = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${profile.value.name} - Digital Card`,
        text: `Contact me!`,
        url: window.location.href,
        files: [new File([vCard.value], `${profile.value.name}.vcf`, { type: 'text/vcard' })]
      })
    } catch (err) {
      console.error('Share failed:', err)
      copyVCard()
    }
  } else {
    copyVCard()
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-lilac-50 to-blue-100 p-6">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      <!-- Header -->
      <div class="bg-blue-600 p-8 text-white text-center">
        <h1 class="text-4xl font-bold">{{ profile.name }}</h1>
        <p class="text-xl mt-2 opacity-90">{{ profile.title }}</p>
      </div>

      <!-- QR Code -->
      <div class="p-8 flex justify-center bg-white">
        <div class="p-4 bg-gray-50 rounded-xl shadow-inner">
          <QRCodeVue 
	    :value="qrValue" 
	    size="200" 
            level="H" 
            foreground="#734F96"
            background="#C8A2C8"
	  />
        </div>
      </div>

      <!-- Buttons -->
      <div class="px-8 pb-8 flex gap-4 justify-center">
        <button @click="shareCard" class="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
          Share Card
        </button>
        <button @click="copyVCard" class="flex-1 py-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md">
          Copy vCard
        </button>
      </div>

      <!-- Details -->
      <div class="px-8 pb-8 space-y-4 text-gray-700 text-center">
        <p><strong>Phone:</strong> {{ profile.phone }}</p>
        <p><strong>Email:</strong> <a :href="`mailto:${profile.email}`" class="text-blue-600 hover:underline">{{ profile.email }}</a></p>
        <p><strong>Website:</strong> <a :href="profile.website" target="_blank" class="text-blue-600 hover:underline">{{ profile.website }}</a></p>
        <p><strong>LinkedIn:</strong> <a :href="profile.linkedin" target="_blank" class="text-blue-600 hover:underline">{{ profile.linkedin }}</a></p>
        <p class="text-sm text-gray-500 mt-6">{{ profile.bio }}</p>
      </div>
    </div>
  </div>
</template>


