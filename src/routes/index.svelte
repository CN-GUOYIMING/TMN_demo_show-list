<script>
  // Dependencies
  import Pagination from '../components/Pagination.svelte';

  const DEFAULT_PAGE = 1; // デフォルトに表示されるページ番号

  const dummyOrignalDate = [
    {code: 'P0001', name: '果物', flag: '食品'}, 
    {code: 'P0002', name: '野菜', flag: '食品'}, 
    {code: 'P0003', name: 'お肉', flag: '食品'}
  ];

    const pageSlices = [];
    let currentPage = DEFAULT_PAGE;

    const addPageSlice = () => {
      const onePageLines = 2;
      const pageNumbers = Math.ceil(dummyOrignalDate.length / onePageLines)

      for ( let times = 1; times <= pageNumbers; times++ ) {
        const startIndex = (times - 1) * onePageLines;
        const endIndex = startIndex + onePageLines;

        pageSlices.push(dummyOrignalDate.slice(startIndex, endIndex));
      }
    }

    addPageSlice();

</script>

<svelte:head>
	<title>Show list template</title>
</svelte:head>

<main>
  <!-- フィルター -->
  <article class="filter_container">
    <div class="filter_code_container">
      <div class="filter_title">大分類コード</div>
      
      <div class="filter_contents_container">
        <input type="text">
        <span class="wave">~</span>
        <input type="text">
      </div>   
    </div>

    <div class="filter_flag_container">
      <div class="filter_title">〇〇フラグ</div>
      
      <div class="filter_contents_container">
        <input type="text">
      </div>
    </div>
  </article>

  <!-- 表示リスト -->
  <article class="table_container">
    <div class="table_header_container">
      <div class="ceil_header">大分類コード</div>
      <div class="ceil_header">大分類名</div>
      <div class="ceil_header ceil_end">〇〇フラグ</div>
    </div>

    <div class="table_items_container">
      {#each pageSlices[currentPage - 1] as item, index(item.code)}
        <div class="table_item_container">
          <div class="ceil_item">{item.code}</div>
          <div class="ceil_item">{item.name}</div>
          <div class="ceil_item ceil_end">
            <input type="text" bind:value={item.flag}>
          </div>
        </div>
      {/each}
    </div>
  </article>

  <!-- ページ -->
  <Pagination pageNumbers={2} bind:currentPage={currentPage} />

  <!-- 保存ボタン -->
  <button type="button" on:click={() => console.log(currentPage)}>保存</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 450px;
  }
  .filter_container {
    display: flex;
    flex-direction: column;
  }
  .filter_code_container {
    display: flex;
    margin-top: 50px;
  }
  .filter_flag_container {
    display: flex;
    margin-top: 10px;
  }
  .filter_title {
    display: flex;
    flex: 2;
  }
  .filter_contents_container {
    display: flex;
    flex: 3;
  }
  input {
    width: 70px;
  }
  .wave {
    margin: 0 20px;
  }
  .table_container {
    margin-top: 20px;
  }
  .table_header_container {
    display: flex;
  }
  .table_item_container {
    display: flex;
  }
  .ceil_header {
    border: 1px solid black;
    border-right: 0;
    display: flex;
    flex: 1;
    padding: 3px 10px;
  }
  .ceil_item {
    border: 1px solid black;
    border-right: 0;
    border-top: 0;
    display: flex;
    flex: 1;
    padding: 3px 10px;
  }
  .ceil_end {
    border-color: black;
    border-right: 1px;
    border-style: solid;
  }
  button {
    align-self: center;
    display: flex;
    margin-top: 20px;
    padding: 1px 20px;
  }
</style>
