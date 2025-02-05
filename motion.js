class Character {
    constructor(elementId, pathPoints) {
        this.character = document.getElementById(elementId);
        this.pathPoints = pathPoints;
        this.index = 0;
    }

    move() {
        if (this.index < this.pathPoints.length - 1) {
            const startx = this.pathPoints[0].x;
            const starty = this.pathPoints[0].y;
            const { x, y } = this.pathPoints[this.index + 1];
            this.character.style.transform = `translate(${x - startx}px, ${y - starty}px)`;
            this.index++;
        } else {
            alert('You win!');
        }
    }
}

class ScrollList {
    constructor(containerSelector, leftBtnId, rightBtnId, scrollAmount = 60) {
        this.container = document.querySelector(containerSelector);
        this.leftBtn = document.getElementById(leftBtnId);
        this.rightBtn = document.getElementById(rightBtnId);
        this.scrollAmount = scrollAmount;

        this.init();
    }

    init() {
        this.leftBtn.addEventListener("click", () => this.scroll(-this.scrollAmount));
        this.rightBtn.addEventListener("click", () => this.scroll(this.scrollAmount));
    }

    scroll(amount) {
        this.container.scrollBy({ left: amount, behavior: "smooth" });
    }
}

class ModalWindow {
    constructor(gameContainerSelector, buttonId, data) {
        this.gameContainer = document.querySelector(gameContainerSelector);
        this.button = document.getElementById(buttonId);
        this.data = data;

        this.button.addEventListener('click', () => this.open());
    }

    open() {
        this.gameContainer.insertAdjacentHTML("afterbegin", this.getModalHTML());

        this.modalWin = document.getElementById("modalwin");
        this.listUsers = document.getElementById("listusers");
        this.exitBtn = document.getElementById("exit");

        this.exitBtn.addEventListener('click', () => this.close());
        this.populateUserList();
    }

    close() {
        this.modalWin.remove();
    }

    populateUserList() {
        const usersRating = this.getSortedUserData();

        this.listUsers.innerHTML = usersRating.map((user, index) => `
            <div class="modalblock_listform_list_user">
                <div class="modalblock_l_l_user_num">${index + 1}</div>
                <div class="modalblock_l_l_user_space"></div>
                <div class="modalblock_l_l_user_name" style="${user.friend ? 'color: red' : ''}">
                    ${user.name} ${user.lastName}
                </div>
                <div class="modalblock_l_l_user_experience">${user.points}</div>
            </div>
        `).join('');
    }

    getSortedUserData() {
        return this.data.rating.map(user => ({
            ...user,
            friend: this.data.friends.some(friend => friend.id === user.id)
        })).sort((a, b) => b.points - a.points);
    }

    getModalHTML() {
        return `
            <div class="modalwin" id="modalwin">
                <div class="modalblock">
                    <div class="exit_btn" id="exit"></div>
                    <div class="modalblock_title">Рейтинг игроков</div>
                    <div class="modalblock_listform">
                        <div class="modalblock_listform_title">
                            <div class="modalblock_l_t_num">Место</div>
                            <div class="modalblock_l_t_space"></div>
                            <div class="modalblock_l_t_name">Имя Фамилия</div>
                            <div class="modalblock_l_t_experience">Опыт</div>
                        </div>
                        <div class="modalblock_listform_list" id="listusers"></div>
                    </div>
                </div>
            </div>
        `;
    }
}


const character = new Character('character', pathPoints);
document.getElementById('goToUniver').addEventListener('click', () => character.move());

new ScrollList(".listfriends_list_all", "left", "right");


new ModalWindow(".game", "stat", data);