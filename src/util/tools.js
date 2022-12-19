import axios from "axios";
// import { history } from "../index";

export const config = {
    setCookie: (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name);
        }
        return null;
    },
    setStore: (name, value) => {
        localStorage.setItem(name, value);
    },
    setStoreJson: (name, value) => {
        let json = JSON.stringify(value);
        localStorage.setItem(name, json);
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null;
    },
    ACCESS_TOKEN: 'accessToken',
    USER_LOGIN: 'userLogin'
}

export const { setCookie, getCookie, getStore, setStore, setStoreJson, getStoreJson, ACCESS_TOKEN, USER_LOGIN } = config;

const DOMAIN = 'http://54.238.241.75:3000/api'

const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU'

/* câsu hình  requet  cho  tất  cả  api  - response cho  tất  cả  kết  quả  từ  api  trả  về */
// cấu hình domain gửi đi
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
})
// cấu hình request header
http.interceptors.request.use(
    config => {
        const token = getStore(ACCESS_TOKEN)
        config.headers = {
            ...config.headers,
            ['Authorization']: `Bearer ${token}`,
            ['TokenCybersoft']: TOKEN_CYBERSOFT
        }
        config.data = {
            ...config.data,
        }

        // if(token) {
        //     config.headers['Authorization'] = 'Bearer' + token
        // }
        // config.headers['Content-Type'] = 
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// cấu hình kết quả trả về
http.interceptors.response.use((response) => {
    return response;
}, err => {
    console.log(err.response.status);
    if (err.response.status === 400 || err.response.status === 404) {
        // history.push('/')
        return Promise.reject(err)
    }

    if (err.response.status === 401 || err.response.status == 403) {
        alert('token không hợp lwj! vui lòng đăng nhập lại')
        // history.push('/login')
        return Promise.reject(err)
    }
})

/* 
    - stattus code
    -400: tham số gửi lên không hợp lệ => kết uqar không tìm được (badrequest)
    -404: tham số gửi lên hợp lệ nhưng không tìm thấy => có thẻ bị xoá rồi (not found)
    -200:thành công, ok
    -201: đã được tạo thàng công => ( mình dã tạo rồi sau đó request tiếp thì sẽ trả 201) (Created)
    -401: không có quyền truy cập vào api đó ( unauthorize - có thẻ do token không hợp lệ hoặc bị admin chặn)
    -403: chưa đủ quyền truy cập vào api đó 
    -500:lỗi xảy ra tại sever ( nguyên nhâp có thể frontend  gửi dữ liệu không hợp lêj => backend trong quá trình sử lí code gây ra lỗi hoặc do backend code bị lỗi => err in sever
) 
*/