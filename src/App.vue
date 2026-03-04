

<script setup lang="ts">
import { ref, computed } from 'vue'
import QRCodeVue from 'qrcode.vue'
import { useClipboard } from '@vueuse/core'

// Profile data
const profile = ref({
  name: 'Jane Doe',
  title: 'Privacy & Data Analyst',
  mobile1: '+65 91234567',
  mobile2: '+61 456789012',
  email: 'abc@example.com',
  website: 'https://github.com/J-Yhwh',
  linkedin: 'https://linkedin.com/in/your_name',
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

TEL;TYPE=CELL:+65 91234567
TEL;TYPE=CELL:+61 456789012

EMAIL:${profile.value.email}
URL:${profile.value.website}
NOTE:${profile.value.bio}
END:VCARD
`);

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
    <div class="max-w-md w-full bf-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
<br>
<br>
<br>
<br>
      <!-- QR Code -->
      <div class="p-8 flex justify-center bg-white">
        <div class="p-4 bc-gray-50 rounded-xl shadow-inner">
          <QRCodeVue 
	    :value="qrValue" 
	    size="220" 
            level="H" 
            foreground="#191970"
            background="#C8A2C8"
	  />
        </div>
      </div>
      <br>
      <br>
      <!-- Buttons -->
      <div class="px-8 pb-8 flex gap-4 justify-center">
        <button @click="shareCard" class="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
         <b>Share&nbsp;</b><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 24 24">
<path d="M18 3A2 2 0 1 0 18 7 2 2 0 1 0 18 3zM18 17A2 2 0 1 0 18 21 2 2 0 1 0 18 17zM6 10A2 2 0 1 0 6 14 2 2 0 1 0 6 10z" opacity=".3"></path><path d="M18 8c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C21 6.7 19.7 8 18 8zM18 4c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C19 4.4 18.6 4 18 4zM18 22c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C21 20.7 19.7 22 18 22zM18 18c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C19 18.4 18.6 18 18 18zM6 15c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C9 13.7 7.7 15 6 15zM6 11c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C7 11.4 6.6 11 6 11z"></path><path d="M7.1 7.5H17V9.5H7.1z" transform="rotate(-30.243 11.997 8.501)"></path><path d="M11 10.6H13V20.5H11z" transform="rotate(-59.748 11.992 15.496)"></path>
</svg>
        </button>&nbsp;&nbsp;
        <button @click="copyVCard" class="flex-1 py-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md">
          <b>Copy&nbsp;</b><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg>
        </button>
      </div>

        <!-- Name and Title-->
      <div class="px-8 pb-6 text-center">
        <h1 class="text-3xl font-bold text-gray-800">{{ profile.name }}</h1>
        <p class="text-lg text-gray-600 mt-1">{{ profile.title }}</p>
      </div>

      <!-- Details -->
      <div class="px-8 pb-8 space-y-4 text-gray-700 text-center">
        <p><strong>Mobile 1:</strong> {{ profile.mobile1 }}</p>
        <p><strong>Mobile 2:</strong> {{ profile.mobile2 }}</p>
	    <p><strong>Email:</strong> <a :href="`mailto:${profile.email}`" class="text-blue-600 hover:underline">{{ profile.email }}</a></p>
        <p><strong>Website:</strong> <a :href="profile.website" target="_blank" class="text-blue-600 hover:underline">{{ profile.website }}</a></p>
        <p><strong>LinkedIn:</strong> <a :href="profile.linkedin" target="_blank" class="text-blue-600 hover:underline">{{ profile.linkedin }}</a></p>
        <p class="text-sm text-gray-500 mt-6">{{ profile.bio }}</p>
      </div>
    </div>
  </div>
</template>


