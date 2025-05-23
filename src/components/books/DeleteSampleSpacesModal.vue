<template>
  <ConfirmModal
    ref="modalRef"
    title="Ready to delete your sample spaces?"
    confirmBtnClass="!px-25 !py-8"
    titleClasses="text-17 font-semibold"
    confirm-btn-title="Yes"
    @confirm="handleDelete"
  >
    <p class="text-14 mt-15 mb-25">
      The sample spaces are there to give you inspiration, but they also clutter your workspace.
      If you no longer need them, we recommend deleting them.
    </p>
  </ConfirmModal>
</template>
<script setup lang="ts">
const { deleteBook, books } = useBook()

const modalRef = ref()

const handleDelete = async () => {
  const sampleBooks = books.value.filter(book => book.isSample)

  await Promise.all(sampleBooks.map(({ id }) => deleteBook(id)))

  modalRef.value.close()
}

onMounted(() => modalRef.value.open())
</script>
