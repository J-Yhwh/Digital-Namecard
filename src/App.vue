

<script setup lang="ts">
import { ref, computed } from 'vue'
import QRCodeVue from 'qrcode.vue'
import { useClipboard } from '@vueuse/core'

// Profile data
const profile = ref({
  name: 'Jane Doe',
  title: 'Full-Stack Developer',
  mobile1: '+65 81234567',
  mobile2: '+61 487654321',
  email: 'sherry@mail.com',
  website: 'https://github.com/J-Yhwh',
  bio: 'Python is my kind of snake.'
})


// vCard string
const vCard = computed(() => `
BEGIN:VCARD
Version 3.0
N:${profile.value.name};;;
FN:${profile.value.name}
TITLE:${profile.value.title}

TEL;TYPE=CELL,PREF:${profile.value.phone}

TEL;TYPE=CELL::65 81234567
TEL;TYPE=CELL:+61 487654321

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


    <!-- THE CARD: Use 'flex flex-row' for side-by-side layout -->
    <div class="flex flex-row w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      
      <!-- LEFT SIDE: Text details (takes up 2/3 space) -->
      <div class="w-2/3 p-8 flex flex-row justify-center border-r border-gray-100">
        <h1 class="text-4xl font-bold mb-1">{{ profile.name }}</h1>
        <p class="text-xl text-navy-500 mb-8">{{ profile.title }}</p>
        
        <p class="mt-10 text-navy-400 italic border-t pt-4">"{{ profile.bio }}"</p>

        <div class="space-y-0 text-indigo-400 text-lg">
          <p><strong>📱 Mobile 1:</strong> {{ profile.mobile1 }}</p>
          <p><strong>📱 Mobile 2:</strong> {{ profile.mobile2 }}</p>
          <p><strong>📧 Email:</strong> <a :href="`mailto:${profile.email}`" class="text-blue-600 hover:underline">{{ profile.email }}</a></p>
          <p><strong>🌐 Website:</strong> <a :href="profile.website" target="_blank" class="text-blue-600 hover:underline">{{ profile.website }}</a></p>
        </div>
       </div>

      </div>

<!-- Parent Container that pushes everything to the right -->
<div class="flex justify-end w-full">

  <!-- QR Code + Buttons -->
  <div class="w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center space-y-6 border-l border-gray-100">
  
    <!-- QR Code Container -->
    <div class="p-6 bg-white rounded-2xl shadow-inner flex-row items-center justify-center">
      <QRCodeVue
        :value="qrValue"
        :size="90"
        level="H"
        foreground="#734F96"
        background="#E6E6FA"
     />
    </div>
   </div>
 <br>
  
          <!-- Share / Copy Buttons – no nesting, SVGs directly inside -->
          <div class="flex gap-4 justify-center w-full max-w-xs lg:max-w-sm">
            <!-- Share Button with SVG -->
            <button @click="shareCard" class="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2">
              <b>Share</b>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                <path d="M18 3A2 2 0 1 0 18 7 2 2 0 1 0 18 3zM18 17A2 2 0 1 0 18 21 2 2 0 1 0 18 17zM6 10A2 2 0 1 0 6 14 2 2 0 1 0 6 10z" opacity=".3"></path>
                <path d="M18 8c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C21 6.7 19.7 8 18 8zM18 4c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C19 4.4 18.6 4 18 4zM18 22c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C21 20.7 19.7 22 18 22zM18 18c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C19 18.4 18.6 18 18 18zM6 15c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C9 13.7 7.7 15 6 15zM6 11c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C7 11.4 6.6 11 6 11z"></path>
                <path d="M7.1 7.5H17V9.5H7.1z" transform="rotate(-30.243 11.997 8.501)"></path>
                <path d="M11 10.6H13V20.5H11z" transform="rotate(-59.748 11.992 15.496)"></path>
              </svg>
            </button>

            <!-- Copy Button with SVG -->
            <button @click="copyVCard" class="flex-1 py-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md flex items-center justify-center gap-2">
              <b>Copy</b>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
         </div>
</div>


 
</template>





            

