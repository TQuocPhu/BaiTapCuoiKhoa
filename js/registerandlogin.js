// Hàm kiểm tra mật khẩu mạnh
function isStrongPassword(password) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
}

// Xử lý đăng ký
document.addEventListener("DOMContentLoaded", function () {
    let registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let username = document.getElementById("regUsername").value.trim();
            let password = document.getElementById("regPassword").value;

            if (!username || !password) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (!isStrongPassword(password)) {
                alert("Mật khẩu yếu!\n\nYêu cầu:\n- Ít nhất 8 ký tự\n- Chữ HOA\n- Chữ thường\n- Số\n- Ký tự đặc biệt");
                return;
            }

            let userList = JSON.parse(localStorage.getItem("userList")) || [];

            let isExisted = userList.some(u => u.username === username);
            if (isExisted) {
                alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác!");
                return;
            }

            userList.push({ username, password });
            localStorage.setItem("userList", JSON.stringify(userList));

            alert("Đăng ký thành công! Mời bạn đăng nhập.");
            window.location.href = "login.html";
        });
    }
});


// Xử lý đăng nhập
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let username = document.getElementById("usernameLogin").value.trim();
            let password = document.getElementById("passwordLogin").value;

            if (!username || !password) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            let userList = JSON.parse(localStorage.getItem("userList")) || [];

            let user = userList.find(u => u.username === username && u.password === password);
            if (username === "admin" && password === "admin123") {
                alert("Đăng nhập thành công với tư cách quản trị viên!");  //Chuyển hướng đến trang quản trị
                window.location.href = "quanly.html";
            } else if (user) {
                alert("Đăng nhập thành công!");
                window.location.href = "index.html"; // Chuyển hướng đến trang chính
            } else {
                alert("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!");
            }
        });
    }
});