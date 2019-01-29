import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { Svg, Path, G, LinearGradient, Defs, Stop } from 'react-native-svg';

export default class CircularProgress extends React.PureComponent {
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    // console.log('x좌표', centerX + (radius * Math.cos(angleInRadians)));
    // console.log('y좌표', centerY + (radius * Math.sin(angleInRadians)));
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  circlePath(x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999); // 0 ~ 360도는 존재하지 않으니깐! 0 ~ 359.999도
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ];
    // console.log(d.join(' '));
    return d.join(' ');
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  render() {
    const {
        size,
        width,
        backgroundWidth,
        tintColor,
        backgroundColor,
        style,
        rotation,
        lineCap,
        arcSweepAngle,
        fill,
        children,
    } = this.props;

    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const offset = size - (width * 2);

    const childContainerStyle = {
        position: 'absolute',
        left: width,
        top: width,
        width: offset,
        height: offset,
        borderRadius: offset / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    return (
      <View style={style}>
        <Svg
            width={size}
            height={size}
            style={{ backgroundColor: 'transparent' }}
        >
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2={size} y2={size}>
                    <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="1" />
                    <Stop offset="0.5" stopColor="red" stopOpacity="0.8" />
                    <Stop offset="1" stopColor="#E5E5E5" stopOpacity="0.8" />
                </LinearGradient>
            </Defs>
            <G rotation={rotation} originX={size/2} originY={size/2}>
                { backgroundColor && (
                    <Path
                        d={backgroundPath}
                        stroke='transparent' // 테두리 줄
                        strokeWidth={backgroundWidth || width} // 테두리 줄 굵기
                        strokeLinecap={lineCap}
                        fill='transparent' // path 따라 가면서 그 안을 색칠
                    />
                )}
                <Path
                    d={circlePath}
                    stroke='url(#grad)'
                    strokeWidth={width}
                    strokeLinecap={lineCap}
                    fill='transparent'
                />
            </G>
        </Svg>
        {children && (
            <View style={childContainerStyle}>
                {children(fill)}
            </View>
        )}
      </View>
    );
  }
}

CircularProgress.propTypes = {
    style: ViewPropTypes.style,
    size: PropTypes.number.isRequired,
    fill: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    backgroundWidth: PropTypes.number,
    tintColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    rotation: PropTypes.number,
    lineCap: PropTypes.string,
    arcSweepAngle: PropTypes.number,
    children: PropTypes.func,
};

CircularProgress.defaultProps = {
    tintColor: 'black',
    lineCap: 'butt',
    arcSweepAngle: 360
};