#############################################################################################
#############################################################################################
##                  This script belongs to Wagaye Tadele Kussa                             ##
##                             copyright@2024                                              ##
## python 3.11.>, python-telegram-bot 21.1.1, pip3 install pytz, apscheduler, requests     ##
##                      httpx 0.24.1, screen and nano                                      ##
#############################################################################################
#############################################################################################
"""IMPORT DEPENDENCIES AND LIBRARIES"""

import logging
from typing import Dict

import httpx
from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update, KeyboardButton, InlineKeyboardButton, \
    InlineKeyboardMarkup, LabeledPrice, WebAppInfo
from telegram.error import TimedOut
import asyncio
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
    Updater,
    CallbackQueryHandler,
    CallbackContext,
    PreCheckoutQueryHandler,
)

# from apscheduler.schedulers.asyncio import AsyncIOScheduler
# from apscheduler.triggers.cron import CronTrigger
# import pytz
import json

import random
import string

# Define a context manager for managing SQLite connections
# import aiosqlite

from datetime import datetime
import re
# import requests
from telegram import InputMediaPhoto
import asyncio

'''logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)'''

PAYMENT_PROVIDER_TOKEN = '7038592586:AAEMD9dqGtt46nqbglYj0JuDCwBz-EBprpg'


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    # reply_keyboard = [
    #     [KeyboardButton(text="wi-Shop",
    #                     web_app=WebAppInfo(url="https://jupiiiii.github.io/TelegramWebApp/newhome.html"))]
    # ]
    reply_keyboard = [
        [KeyboardButton(text="wi-Shop",
                        web_app=WebAppInfo(url="https://jupiiiii.github.io/lwach/lwach_home.html"))]
    ]

    reply_markup = ReplyKeyboardMarkup(reply_keyboard, resize_keyboard=True, one_time_keyboard=True)
    await update.message.reply_text('Click the button below to shop with wi-Shop', reply_markup=reply_markup)


async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    '''logger.info(f"Received update: {update}")'''
    if update.message and update.message.web_app_data:
        data = update.message.web_app_data.data
        data = json.loads(data)
        if 'items' in data and 'grandTotal' in data:
            items = data['items']
            total = data['grandTotal']
            '''for items in items:
                await update.message.reply_text(
                    f"Item: {items['name']}, x{items['quantity']}========> ${items['totalPrice']}")'''
            await update.message.reply_text(f"Your orders total is: ${total}\nPay below!")

            title = "wi-Shop"
            description = "Your payment will be processed in a secure and safe way."
            # select a payload just for you to recognize its the donation from your bot
            payload = "wi_shop"
            # In order to get a provider_token see https://core.telegram.org/bots/payments#getting-a-token
            currency = "USD"
            # price in ETB
            total = int(total.split('.')[0])

            price = total
            # price * 100 so as to include 2 decimal points
            prices = [LabeledPrice("wi_Shop", price * 100)]

            # optionally pass need_name=True, need_phone_number=True,
            # need_email=True, need_shipping_address=True, is_flexible=True
            await context.bot.send_invoice(chat_id, title, description, payload, PAYMENT_PROVIDER_TOKEN, currency,
                                           prices,
                                           need_name=True, )
            # url = 'https://checkout.chapa.co/checkout/web/payment/PL-Htjp2C9EwgIa'
            # await update.message.reply_text(url)
        elif 'message' in data:
            await update.message.reply_text(f"Your data:\n {data['name']}, {data['email']}, {data['phone']}, {data['message']}")

    else:
        await update.message.reply_text("No web app data received.")


async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Answers the PreQecheckoutQuery"""
    query = update.pre_checkout_query
    # check the payload, is this from your bot?
    if query.invoice_payload != "wi_shop":
        # answer False pre_checkout_query
        await query.answer(ok=False, error_message="Something went wrong...")
    else:
        await query.answer(ok=True)


# finally, after contacting the payment provider...
async def successful_payment_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Confirms the successful payment."""
    # do something after successfully receiving payment?
    chat_id = update.effective_chat.id
    lang = context.user_data.get('user_language')

    text = "Thank you for your payment!\n\n🎉​🎉​✨​✨​🔥​🔥​❤️​❤️​🤍​🤍​\n\nYour orders will be processed and dispatched ASAP!"
    await update.message.reply_text(text)


def main() -> None:
    application = Application.builder().token('7038592586:AAEMD9dqGtt46nqbglYj0JuDCwBz-EBprpg').build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))

    max_retries = 5

    while True:
        try:
            # Keep the bot running
            asyncio.run(application.run_polling(allowed_updates=Update.ALL_TYPES))
            # application.run_polling(allowed_updates=Update.ALL_TYPES)
        except KeyboardInterrupt:
            print("Bot stopped by the user.")
            break
        except Exception as e:
            print(f"An error occurred: {e}")

        # Retry mechanism
        retry_count = 0
        while retry_count < max_retries:
            try:
                # Attempt to restart polling
                asyncio.run(application.run_polling(allowed_updates=Update.ALL_TYPES))
                # application.run_polling(allowed_updates=Update.ALL_TYPES)
                print("Bot restarted successfully.")
                break  # Exit the retry loop if polling is restarted successfully
            except TimedOut:
                # If a timeout occurs, increment the retry count and retry
                retry_count += 1
                print(f"Restarting bot polling timed out. Retrying... (Attempt {retry_count}/{max_retries})")

        if retry_count == max_retries:
            print("Failed to restart bot polling after multiple attempts.")
            # You can log the failure or take appropriate action here


if __name__ == "__main__":
    asyncio.run(main())
