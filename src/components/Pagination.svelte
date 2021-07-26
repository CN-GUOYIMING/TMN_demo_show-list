<script>
  const DEFAULT_PAGE = 1; // デフォルトに表示されるページ番号

  export let pageNumbers;
  export let currentPage = DEFAULT_PAGE;
</script>

<article class="main-container">
  <button 
    type="button" 
    on:click={
      () => currentPage = currentPage - 1 > 0 
        ? currentPage - 1 
        : DEFAULT_PAGE
    }
  >
    {'<'}
  </button>
  
  <span class="current-page">{currentPage}</span>
  
  <button 
    type="button"
    on:click={
      () => currentPage = currentPage + 1 < pageNumbers 
        ? currentPage + 1 
        : pageNumbers
    }
  >
    {'>'}
  </button>
</article>

<style>
  .main-container {
    align-self: center;
    display: flex;
    margin-top: 20px;
  }
  .current-page {
    border-bottom: 1px solid orangered;
    cursor: pointer;
    margin: 0 20px;
  }
  button {
    cursor: pointer;
  }
</style>