$("#send").on('click',function(){
    const url = "https://www.googleapis.com/books/v1/volumes?q="+$("#key").val();
    $.ajax({
        url: url,
        dataType: "json"
    }).done(function(data) {
        console.log(data);           //オブジェクトの中を確認
        const len=data.items.length; //データの数を取得
        let html_title;
        let html;

        html_title += `
            <tr>
                <th class="th_long">書籍</th>
                <th class="th_long">名称</th>
                <th class="th_small">出版社</th>
                <th class="th_description">概要</th>
            </tr>
        `;
        for(let i=0; i<len; i++){
            if(typeof data.items[i].volumeInfo.publisher=="undefined"){
                data.items[i].volumeInfo.publisher="出版社(不明)";
            }
            html +=`
                <tr>
                    <td class='td_long'>
                        <a target="_blank" href="${data.items[i].volumeInfo.infoLink}">
                            <img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" width="75%" />
                        </a>
                    </td>
                    <td class='td_long'>${data.items[i].volumeInfo.title}</td>
                    <td class="td_small">${data.items[i].volumeInfo.publisher}</td>
                    <td class="td_description">${data.items[i].volumeInfo.description}</td>
                </tr>
            `;
        }
        $("#list").empty().hide().append(html_title + html).fadeIn(2000);
    });
});