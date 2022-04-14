import os, glob
import sys
import json

from jinja2 import Environment, FileSystemLoader, Template

from PyQt5 import QtCore, QtWebEngineWidgets
from PyQt5.QtGui import QPageLayout, QPageSize
from PyQt5.QtWidgets import QApplication


def read_txt_file(filename):
    if os.path.exists(filename):
        with open(filename) as file:
            post_text = file.read()
        return post_text
    else:
        return ''


def get_data(dir, year):
    #filelist = os.listdir(dir)
    targetPattern = os.path.join(dir,f"{year}*.json")
    filelist = sorted(glob.glob(targetPattern), reverse=True)
    content = []
    for name in filelist:
        filename, ext = os.path.splitext(name)
        images = glob.glob(filename+"*.jpg")
        file_date = filename.rsplit('/', 1)[-1]
        post_date = '{}.{}.{}'.format(file_date[8:10], file_date[5:7], file_date[:4])
        content.append({'date':post_date, 'images':images, 'text':read_txt_file(filename+'.txt')})
    #print(content)
    return content


def create_html(src, year, author, filename):
    if year == 'all':
        year = '????-??-??'
        year_str = 'все годы'
    else:
        year_str = year

    content = {
        'title': f'Архив постов Instagram за {year_str}',
        'author': author,
        'posts': get_data(src, year),
    }

    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template("post_template.html")
    print('Rendering template ...', filename)
    template.stream(content).dump(filename)



def html_to_pdf(html, pdf):
    if os.path.exists(html):
        app = QApplication(sys.argv)
        page = QtWebEngineWidgets.QWebEnginePage()
       # layout = QPageLayout()
       # layout.setPageSize(QPageSize(QPageSize.A3))
       # layout.setOrientation(QPageLayout.Landscape)
       # layout.setMargins(QtCore.QMarginsF(20,20,20,20))

        def handle_print_finished(filename):
            print("File saved as:", filename)
            QApplication.quit()

        def handle_load_finished(status):
            if status:
                print("Loaded HTML file:", html)
                page.printToPdf(pdf)
            else:
                print("HTML load Failed")
                QApplication.quit()

        page.pdfPrintingFinished.connect(handle_print_finished)
        page.loadFinished.connect(handle_load_finished)

        CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
        html = os.path.join(CURRENT_DIR, html)

        page.load(QtCore.QUrl.fromLocalFile(html))
        app.exec_()


def generate_book(src, pdf=None):
    if len(sys.argv) > 1:
        username = sys.argv[1]
        filename = glob.glob("data/" + username + "*.json")
        if filename:
            with open(filename[0], 'r') as f:
                data = json.load(f)['node']

            name = data['username'] if data else username
            author = data['full_name']
        else:
            name = username
            author = None
    else:
        name = 'instagram'
        author = None

    year = sys.argv[2] if len(sys.argv) > 2 else 'all'
    html = f'{name}_{year}.html'

    create_html(src, year, author, html)
    if pdf:
        html_to_pdf(html, pdf)

