<?php

global $pdo, $coin;

?>

<section class="account-appeal">
    <div class="container">
        <div class="content">
            <div class="appeal">
                <div class="appeal-title">
                    <span class="appeal-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#message"></use></svg>
                    </span>
                    <span class="appeal-title__text">Обращение 8578</span>
                </div>
                <div class="appeal-content">
                    <div class="appeal-list">
                        <div class="appeal-item"><?= $_txt['appeal-theme']; ?>: <span class="appeal-item__text">Проблемы с размещением</span></div>
                        <div class="appeal-item"><?= $_txt['appeal-status']; ?>:  <span class="appeal-item__text color">Открыто</span></div>
                        <div class="appeal-item"><?= $_txt['appeal-created']; ?>:  <span class="appeal-item__text">13:47 24.07.22</span></div>
                    </div>
                </div>
            </div>
            <div class="chat">
                <div class="chat-window-wrap">
                    <div class="chat-window">
                        <div class="chat-list">
                            <div class="chat-item">
                                <div class="chat-item__message">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis possimus saepe, molestias non expedita veniam recusandae soluta. 
                                    Assumenda atque, facilis similique illo esse minima? Odit neque iusto temporibus totam iure?
                                </div>
                                <div class="chat-item__date">20.58</div>
                            </div>
                            <div class="chat-item">
                                <div class="chat-item__message">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis possimus saepe, molestias non expedita veniam recusandae soluta. 
                                    Assumenda atque, facilis similique illo esse minima? Odit neque iusto temporibus totam iure?
                                </div>
                                <div class="chat-item__date">20.58</div>
                            </div>
                            <div class="chat-item">
                                <div class="chat-item__message">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis possimus saepe, molestias non expedita veniam recusandae soluta. 
                                    Assumenda atque, facilis similique illo esse minima? Odit neque iusto temporibus totam iure?
                                </div>
                                <div class="chat-item__date">20.58</div>
                            </div>
                            <div class="chat-item">
                                <div class="chat-item__message">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis possimus saepe, molestias non expedita veniam recusandae soluta. 
                                    Assumenda atque, facilis similique illo esse minima? Odit neque iusto temporibus totam iure?
                                </div>
                                <div class="chat-item__date">20.58</div>
                            </div>
                            <div class="chat-item">
                                <div class="chat-item__message">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis possimus saepe, molestias non expedita veniam recusandae soluta. 
                                    Assumenda atque, facilis similique illo esse minima? Odit neque iusto temporibus totam iure?
                                </div>
                                <div class="chat-item__date">20.58</div>
                            </div>
                        </div>
                    </div>
                </div>
                <form action="/" class="chat-form">
                    <div class="form-item">
                        <textarea name="" placeholder="Введите ваше сообщение"></textarea>
                    </div>
                    <button class="button"><?= $_txt['appeal-send']; ?></button>

                    <button class="button-phone">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#send"></use></svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

            