$(document).ready(function() {
    
    // 預設語言為 'en' (英文)
    var currentLang = 'en';

    /**
     * 1. 語言切換核心邏輯 (已修正：確保按鈕更新邏輯被執行)
     * 根據 data-en 或 data-zh 屬性切換頁面上的文字內容
     */
    function switchLanguage(lang) {
        
        // 可選：用於偵錯，確認函式有執行
        // console.log("DEBUG: Switching language to:", lang);

        // 1. 更新 HTML 的 lang 屬性
        $('html').attr('lang', lang);
        
        // 2. 遍歷所有帶有 data-en/data-zh 屬性的元素，更新文本
        $('[data-en], [data-zh]').each(function() {
            var $this = $(this);
            var newText = $this.data(lang); // 取得對應語言的文本 (en 或 zh)
            
            // 跳過語言切換按鈕的處理，我們在迴圈後獨立處理它
            if ($this.attr('id') === 'lang-toggle') {
                return true; // 相當於 continue
            }
            
            // 處理 <title> 標籤
            if ($this.is('title')) {
                document.title = newText;
            } 
            // 處理連結和按鈕 (非語言切換按鈕)
            else if ($this.is('a') || $this.is('button')) {
                // 如果是帶有圖標的連結 (例如 Read More / CTA 按鈕)
                if ($this.hasClass('read-more-link') || $this.hasClass('secondary-button')) {
                     var iconHtml = $this.find('i').prop('outerHTML') || '';
                     $this.html(newText + ' ' + iconHtml);
                } 
                else {
                    $this.text(newText);
                }
            } 
            // 處理其他元素的文本內容 (h1, p, span, h3)
            else {
                $this.text(newText);
            }
        });
        
        // 3. 獨立處理語言切換按鈕的文本和國旗 (確保執行)
        var $langToggle = $('#lang-toggle');
        if (lang === 'zh') {
            $langToggle.html('ENGLISH'); // 切換到中文，按鈕顯示切換回英文的提示
        } 
        else {
            $langToggle.html('繁體中文'); // 切換到英文，按鈕顯示切換到中文的提示
        }
        
        // 4. 更新當前語言狀態
        currentLang = lang;
        $langToggle.attr('data-current-lang', lang);
    }
    
    // 綁定語言切換按鈕的點擊事件
    $('#lang-toggle').on('click', function() {
        // 可選：用於偵錯，確認點擊事件有觸發
        // console.log("DEBUG: Lang toggle clicked! Current:", currentLang);
        
        var newLang = (currentLang === 'en') ? 'zh' : 'en';
        switchLanguage(newLang);
    });

    // 初始化：確保頁面載入時是英文
    switchLanguage('en'); 

    // ------------------------------------------------------------------
    // 2. 導覽列漢堡選單的切換 (RWD 手機版)
    // ------------------------------------------------------------------
    $('.menu-icon').on('click', function() {
        $('.header-left .nav').slideToggle(300);
    });


    // ------------------------------------------------------------------
    // 3. 首頁主題卡片點擊互動 (Home Page - index.html)
    // ------------------------------------------------------------------
    $('.news-card').on('click', function(e) {
        // 阻止點擊卡片連結時跳轉
        if (!$(e.target).is('a')) {
            // 取得對應語言的標題
            var titleEn = $(this).find('h3').data('en');
            var titleZh = $(this).find('h3').data('zh');
            
            var alertMessage;
            if (currentLang === 'en') {
                alertMessage = 'You clicked "' + titleEn + '". This page is a dedicated feature page (as per the proposal) and will contain detailed data.';
            } else {
                alertMessage = '您點擊了「' + titleZh + '」。此頁面是一個專門的功能頁面（根據提案），將包含詳細的數據。';
            }
            alert(alertMessage);
        }
    });

    // ------------------------------------------------------------------
    // 4. 能源分頁 (energy.html) 專用互動邏輯
    // ------------------------------------------------------------------
    
    // 點擊能源數據表格行時，突出顯示該行
    $('.energy-data-table tbody tr').on('click', function() {
        // 只有在 .energy-tracker 容器存在時才執行，確保不會影響其他頁面
        if ($(this).closest('.energy-tracker').length) {
            // 移除所有行的 active 樣式
            $('.energy-data-table tbody tr').removeClass('tracker-active');
            
            // 為當前點擊的行添加 active 樣式
            $(this).addClass('tracker-active');
            
            // 顯示一個提示
            var raceName = $(this).find('td:first').text();
            
            var alertMessage;
            if (currentLang === 'en') {
                 alertMessage = 'Data for ' + raceName + ' selected for deeper analysis.';
            } else {
                 alertMessage = '已選取 ' + raceName + ' 的數據進行深度分析。';
            }
            alert(alertMessage);
        }
    });

    // ------------------------------------------------------------------
    // 5. 健康與安全 (health.html) & 平等 (equality.html) 專用互動邏輯
    // ------------------------------------------------------------------

    // 統一處理 Health/Equality 頁面中的所有 .primary-button 點擊事件
    $('.tool-card .primary-button').on('click', function(e) {
        e.preventDefault();
        var $card = $(this).closest('.tool-card');
        var cardId = $card.attr('id');
        var alertMessage;

        if (currentLang === 'en') {
            switch (cardId) {
                case 'driver-quiz':
                    alertMessage = "Quiz feature initiated! You'll be asked 5 questions about G-forces and driver training.";
                    break;
                case 'heat-risk-widget':
                    alertMessage = "Heat Risk Widget initiated! (Simulated) Risk level for today: HIGH. Remember to hydrate!";
                    break;
                case 'mentorship-resources':
                    alertMessage = "Mentorship link opened! (Simulated) Connecting you to 'Women in Motorsport Engineering' database...";
                    break;
                case 'stereotype-quiz':
                    alertMessage = "Stereotype Quiz initiated! You'll be asked scenarios to challenge common biases.";
                    break;
                default:
                    alertMessage = "Tool activated! (Simulated)";
            }
        } else { // Chinese (zh)
            switch (cardId) {
                case 'driver-quiz':
                    alertMessage = "測驗功能啟動！您將被問及 5 個關於 G 力和車手訓練的問題。";
                    break;
                case 'heat-risk-widget':
                    alertMessage = "熱風險工具啟動！(模擬) 今天風險等級：高。請記得補充水分！";
                    break;
                case 'mentorship-resources':
                    alertMessage = "指導連結已開啟！(模擬) 正在將您連接到「賽車運動工程中的女性」資料庫...";
                    break;
                case 'stereotype-quiz':
                    alertMessage = "刻板印象測驗啟動！您將被要求回答挑戰常見偏見的場景問題。";
                    break;
                default:
                    alertMessage = "工具已啟動！(模擬)";
            }
        }
        alert(alertMessage);
    });

}); // document.ready 結束
