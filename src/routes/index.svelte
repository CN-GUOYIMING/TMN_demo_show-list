<script>
  // Dependencies
  import { onMount } from 'svelte';
  // Components
  import Pagination from '../components/Pagination.svelte';

  // Const
  const DEFAULT_PAGE = 1; // デフォルトに表示されるページ番号
  const ONE_PAGE_LINES = 2; // 一ページに表示される件数

  let dataList = [];
  let currentPage = DEFAULT_PAGE;
  $: pageSlices = filterData(dataList, { codeRange, targetFlag });
  let codeRange = { begin: '', end: '' }
  let targetFlag = '';

  onMount(async () => {
    try {
      // NOTE: 初期データを取得する API はここでコール。
      let dummyData = [
        {code: 'P0001', name: '果物', flag: '常温'}, 
        {code: 'P0002', name: '野菜', flag: '常温'}, 
        {code: 'P0003', name: '豚肉', flag: '冷凍'},
        {code: 'P0004', name: '魚肉', flag: '冷凍'},
        {code: 'P0005', name: '牛肉', flag: '冷凍'},
        {code: 'P0006', name: '鶏肉', flag: '冷凍'}
      ]
  
      dataList = dummyData;
    } catch (error) {
      console.log(error);
    }
  });

  /** Functions*/
  /**
   * データを濾過する。
   * @param orignalData
   * @param filterTerms
   * 
   * @returns {Array}
   */
  const filterData = (orignalData, { codeRange, targetFlag }) => {
    let slices = [];
    let temporary = orignalData;

    temporary = filterDataByCode(temporary, codeRange);
    temporary = filterDataByFlag(temporary, targetFlag);
    slices = slicePage(temporary);
    
    return slices;
  };

  const filterDataByCode = (
    data, codeRange = { begin: null, end: null }
  ) => {
    if (!codeRange.begin && !codeRange.end) return data;

    // NOTE: コードに応じて比較方法が変わることがある。
    return data.filter(
      item => codeRange.begin <= item.code && item.code <=codeRange.end
    )
  };

  const filterDataByFlag = (data, flag) => {
    if (!flag) return data;
    return data.filter(item => item.flag.includes(flag));
  };

  const slicePage = (data) => {
    let slices = [];

    // 総データの件数をページ毎の表示件数で割ってページ数を取得
    const pageNumbers = data.length 
      ? Math.ceil(data.length / ONE_PAGE_LINES)
      : DEFAULT_PAGE
    
    // ページ数を回数にループを行い、ページ毎の表示データを切り分ける
    for ( let times = 1; times <= pageNumbers; times++ ) {
      const startIndex = (times - 1) * ONE_PAGE_LINES;
      const endIndex = startIndex + ONE_PAGE_LINES;

      slices = [...slices, data.slice(startIndex, endIndex)];
    }

    return slices;
  }

  const updateData = () => {
    // NOTE: 更新 API はここでコール。
    console.log(dataList);
  };
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
        <input type="text" bind:value={codeRange.begin}>
        <span class="wave">~</span>
        <input type="text" bind:value={codeRange.end}>
      </div>   
    </div>

    <div class="filter_flag_container">
      <div class="filter_title">〇〇フラグ</div>
      
      <div class="filter_contents_container">
        <input type="text" bind:value={targetFlag}>
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
  <Pagination 
    pageNumbers={pageSlices.length} 
    bind:currentPage={currentPage} 
  />

  <!-- 保存ボタン -->
  <button type="button" on:click={() => updateData()}>保存</button>
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
