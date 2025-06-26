<template>
  <div class="flex flex-grow items-center justify-center p-4">
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-full max-w-sm bg-primary/80 p-6 rounded">
      <h2 class="text-xl font-bold text-center">{{ t('login.title') }}</h2>
      <UInput v-model="username" :placeholder="t('login.username')" />
      <UInput type="password" v-model="password" :placeholder="t('login.password')" />
      <UButton type="submit" color="white" variant="outline">{{ t('login.submit') }}</UButton>
      <p v-if="error" class="text-red-500 text-center">{{ t('login.error') }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
const { t } = useI18n()

const username = ref('')
const password = ref('')
const error = ref(false)

const validUsername = 'admin'
const hashedPassword = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'

async function hash(text: string) {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function handleLogin() {
  const hashValue = await hash(password.value)
  if (username.value === validUsername && hashValue === hashedPassword) {
    localStorage.setItem('loggedIn', 'true')
    navigateTo('/')
  } else {
    error.value = true
  }
}
</script>
