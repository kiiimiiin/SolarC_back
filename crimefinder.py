from pathlib import Path
import torch
import time

detect_script_path = Path('C:/Users/minki/Desktop/Projects/yolov5-master/yolov5-master/detect.py')  # 적절한 경로로 변경

# 파라미터 설정
weights = 'best.pt'
conf = 0.5
img_size = 416
source = "http://10.50.9.134:8090/?action=stream"
# "http://192.168.43.248:8090/?action=stream"
# 파이썬 스크립트 실행
with torch.no_grad():
    command = f'python {detect_script_path} --weights {weights} --conf {conf} --img {img_size} --source {source}'
    try:
        # subprocess 모듈을 사용하여 콘솔 명령 실행
        import subprocess
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        process.wait()
        output, error = process.communicate()
        print(output.decode())  # 결과 출력
        time.sleep(0)

    except Exception as e:
        print(f"에러 발생: {e}")