/*-----------------------------config---------*/
var pg_config = {
    status: {
        100: 'Không có dữ liệu',
        150: 'Liên kết máy chủ thất bại, mời đăng nhập lại',
        200: 'SUCCESS',
        201: 'Xin lỗi !Bạn chưa có tên nhân vật trong server này, mong bạn chọn thử chọn server khác nhé!',
        199: 'Lỗi khác',
        202: 'Error',
        203: 'Chưa đạt yêu cầu',
        204: 'Hết code rồi',
        205: 'Hoạt động nhận code đã kết thúc',
        100: 'Chưa tìm được event',
        101: 'Chưa tìm được điều kiện',
        102: ' Hi  bạn, bạn hiện không có số lần quay, có thể là do: '+'\n'+'1. Bạn chưa đạt điều kiện nhận số lần quay;'+'\n' +'2. Số lần quay của bạn đã dùng hết rồi',
        103: 'Chưa đạt được yêu cầu hoặc bạn đã hết số lần quay',
        104: 'Giftcode không đủ',
        105: 'Hoạt động chưa cấu hình phần thưởng',
        150: 'Chưa tìm được APP',
        160: 'Chưa tìm được Server',
        170: 'Chưa tìm được cấu hình FB',
        200: 'Thành công',
        201: 'Chưa có nhân vật trong server này, mau vào game để tạo nhé!',
        300: 'Cổng đăng nhập không hưởng ứng',
        301: 'Tài khoản hoặc mật khẩu có sai',
        302: 'Bạn vẫn chưa có tài khoản! Mau tải game đăng kí tài khoản nhận thưởng nhé!',
        400: 'Tham số lỗi',
        403: 'Người chơi chưa đăng nhập',
        500: 'Client server khác thường',
        600: 'session không có cache danh sách người c'
    },
    fb_app_id: 425031904305171,
    fb_redirect_uri: window.location.host === 't.changicvn.com' ? 'http://t.changicvn.com/HNTQ/index.html' : 'http://hongnhantamquoc.changicvn.com/HNTQ/index.html',
//    login_url: 'http://54.255.175.55:8680/fb/login',
    login_url: 'http://192.168.60.25:7400/fb/login',
//    api_url: 'http://54.255.175.55:8680/'
    api_url: 'http://192.168.60.25:7400/'
};

