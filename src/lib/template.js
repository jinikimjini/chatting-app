//refactoring 리펙토링 >>코드정리하는것
module.exports = {
    html: function (title, list, body, control) {
        return `<!doctype html>
              <html>
              <head>
                <title>main</title>
                <meta charset="utf-8"> 
                <style>
                * {
                margin: 0;
                padding: 0;
            }
            
            html, body {
                height:100%;
            }
                .display-container{
                    flex:12;
                    background: #ba97c8;
             
                }
                .wrapper {
                    height: 100%;
                    width: 100%;
                    display: flex;/*옆으로 정렬*/
                    flex-direction: column;/*세로정렬*/
                    overflow: hidden;
                }
                h1{
                    color:white;
                    font-size:350%;
                   
                }
                </style>             
              </head>
              <body>
              <div class="wrapper">
              <div class="display-container">
              <div style="position: absolute; top:35%; left: 42%;">
              <div style="display:flex;">  
              <h1>GENIE</h1>
                <img alt="logo" src="/genie.jpg"/>
                </div> 
              ${list}
              ${control}
              ${body}
                
                </div>
                </div>
                </div>
              </body>
              </html>
          `;
    },
    list: function (topics) {
        var list = `<ul>`;
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href="/?id=${topics[i]}">${topics[i].memName}</a></li>`;
            i = i + 1;
        }
        list = list + `</ul>`;
        return list;
    },
    htmlMain: function (login) {
        return `<!doctype html>
              <html>
              <head>
                <title>main</title>
                <meta charset="utf-8"> 
                <style>
                * {
                margin: 0;
                padding: 0;
            }
            
            html, body {
                height:100%;
            }
                .display-container{
                    flex:12;
                    background: #ba97c8;
             
                }
                .wrapper {
                    height: 100%;
                    width: 100%;
                    display: flex;/*옆으로 정렬*/
                    flex-direction: column;/*세로정렬*/
                    overflow: hidden;
                }
                h1{
                    color:white;
                    font-size:350%;
                   
                }
                </style>             
              </head>
              <body>
              <div class="wrapper">
              <div class="display-container">
              <div style="position: absolute; top:35%; left: 42%;">
              <div style="display:flex;">  
              <h1>GENIE</h1>
                <img alt="logo" src="/genie.jpg"/>
                </div> 
                  ${login}              
                </div>
                </div>
                </div>
              </body>
              </html>
          `;
    }
}
